import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './UserModal.scss';

const UserModal = ({ show, onHide, user, setUsers, viewMode }) => {
  const isEdit = !!user;

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone is required'),
    dob: Yup.date().required('Date of Birth is required'),
    status: Yup.string().oneOf(['active', 'inactive']).required('Status is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      dob: '',
      status: 'active',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEdit) {
          await axios.put(`http://localhost:3001/users/${user.id}`, values);
          setUsers(prev => prev.map(u => u.id === user.id ? { ...u, ...values } : u));
        } else {
          const response = await axios.post('http://localhost:3001/users', {
            ...values,
            createdAt: new Date().toISOString(),
          });
          setUsers(prev => [...prev, response.data]);
        }
        onHide();
      } catch (error) {
        console.error('Error saving user:', error);
      }
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        name: user.name,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        status: user.status,
        createdAt: user.createdAt,
      });
    } else {
      formik.resetForm();
    }
  }, [user]);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{viewMode ? 'User Details' : isEdit ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={formik.handleSubmit} className="form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              disabled={viewMode}
            />
            {!viewMode && formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              disabled={viewMode}
            />
            {!viewMode && formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </label>

          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              disabled={viewMode}
            />
            {!viewMode && formik.touched.phone && formik.errors.phone && (
              <div className="error">{formik.errors.phone}</div>
            )}
          </label>

          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
              disabled={viewMode}
            />
            {!viewMode && formik.touched.dob && formik.errors.dob && (
              <div className="error">{formik.errors.dob}</div>
            )}
          </label>

          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="status"
                value="active"
                checked={formik.values.status === 'active'}
                onChange={formik.handleChange}
                disabled={viewMode}
              />
              Active
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={formik.values.status === 'inactive'}
                onChange={formik.handleChange}
                disabled={viewMode}
              />
              Inactive
            </label>
          </div>
          {!viewMode && formik.touched.status && formik.errors.status && (
            <div className="error">{formik.errors.status}</div>
          )}

          <div className="button-group">
            <button type="button" onClick={onHide} className="cancel-btn">
              Cancel
            </button>
            {!viewMode && (
              <button type="submit" className="submit-btn">
                {isEdit ? 'Update' : 'Create'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
