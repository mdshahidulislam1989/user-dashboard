import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserModal = ({ show, onHide, user, setUsers }) => {
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
      });
    } else {
      formik.resetForm();
    }
  }, [user]);

  if (!show) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContainer}>
        <h2>{isEdit ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={formik.handleSubmit} style={styles.form}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && <div style={styles.error}>{formik.errors.name}</div>}
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && <div style={styles.error}>{formik.errors.email}</div>}
          </label>

          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone && <div style={styles.error}>{formik.errors.phone}</div>}
          </label>

          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
            />
            {formik.touched.dob && formik.errors.dob && <div style={styles.error}>{formik.errors.dob}</div>}
          </label>

            <div style={styles.form}>
           
            <div style={styles.radioGroup}>
                <label style={styles.radioLabel}>
                <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formik.values.status === 'active'}
                    onChange={formik.handleChange}
                />
                Active
                </label>
                <label style={styles.radioLabel}>
                <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formik.values.status === 'inactive'}
                    onChange={formik.handleChange}
                />
                Inactive
                </label>
            </div>
            {formik.touched.status && formik.errors.status && (
                <div style={styles.error}>{formik.errors.status}</div>
            )}
            </div>


          <div style={styles.buttonGroup}>
            <button type="button" onClick={onHide} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.submitBtn}>{isEdit ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  error: {
    color: 'red',
    fontSize: '0.8rem',
  },
 

  radioGroup: {
   
    display: 'flex',
    justifyContent: 'center',   
    gap: '20px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '15px',
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  submitBtn: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default UserModal;
