import React, { useEffect, useState } from "react";
import './Profile.css';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Edit2, Save, X, LogOut } from 'lucide-react';

const Profile = () => {
  const profileBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { currentUser, userProfile, logout, updateProfile } = useAuth();

  useEffect(() => { 
    if (userProfile) {
      setFormData({
        username: userProfile.username || '',
        phoneNumber: userProfile.phoneNumber || '',
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form
      setFormData({
        username: userProfile.username || '',
        phoneNumber: userProfile.phoneNumber || '',
      });
    }
    setIsEditing(!isEditing);
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    // Validation
    if (formData.username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (formData.phoneNumber.trim().length < 10) {
      setError('Phone number must be at least 10 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfile({
        username: formData.username,
        phoneNumber: formData.phoneNumber,
      });
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="full-page-background" style={profileBackgroundStyle}></div>
      <div className='page-content'>
        <div className='profile-container'>
          <div className='profile-card'>
            <div className='profile-header'>
              <h1>My Profile</h1>
              {!isEditing ? (
                <button 
                  className="edit-button" 
                  onClick={handleEditToggle}
                  aria-label="Edit profile"
                >
                  <Edit2 size={18} />
                  Edit
                </button>
              ) : (
                <button 
                  className="cancel-button" 
                  onClick={handleEditToggle}
                  aria-label="Cancel editing"
                >
                  <X size={18} />
                  Cancel
                </button>
              )}
            </div>

            {error && <div className="profile-error">{error}</div>}
            {success && <div className="profile-success">{success}</div>}

            <div className='profile-info'>
              <div className='profile-field'>
                <div className='field-label'>
                  <User size={20} />
                  <span>Username</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className='profile-input'
                    placeholder="Enter username"
                  />
                ) : (
                  <div className='field-value'>{userProfile?.username || 'N/A'}</div>
                )}
              </div>

              <div className='profile-field'>
                <div className='field-label'>
                  <Mail size={20} />
                  <span>Email</span>
                </div>
                <div className='field-value'>{currentUser?.email || 'N/A'}</div>
                <div className='field-note'>Email cannot be changed</div>
              </div>

              <div className='profile-field'>
                <div className='field-label'>
                  <Phone size={20} />
                  <span>Phone Number</span>
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className='profile-input'
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className='field-value'>{userProfile?.phoneNumber || 'N/A'}</div>
                )}
              </div>

              <div className='profile-field'>
                <div className='field-label'>
                  <span>Provider</span>
                </div>
                <div className='field-value'>
                  {userProfile?.provider === 'google' ? 'Google Sign-In' : 'Email/Password'}
                </div>
              </div>
            </div>

            <div className='profile-actions'>
              {isEditing && (
                <button 
                  className="save-button" 
                  onClick={handleSave}
                  disabled={isSubmitting}
                >
                  <Save size={18} />
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              )}
              <button 
                className="logout-button" 
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
