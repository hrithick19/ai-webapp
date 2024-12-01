import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const workApi = {
    getAll: () => apiClient.get('/works/'),
    getById: (id) => apiClient.get(`/works/${id}/`),
    create: (data) => apiClient.post('/works/', data),
    update: (id, data) => apiClient.put(`/works/${id}/`, data),
    delete: (id) => apiClient.delete(`/works/${id}/`),
};

export const bookApi = {
    getAll: (params = {}) => apiClient.get('/books/', { params }),
    getBySlug: (slug) => apiClient.get(`/books/${slug}/`),
    getFeatured: () => apiClient.get('/books/featured/'),
    getReviews: (slug) => apiClient.get(`/books/${slug}/reviews/`),
};

export const homeApi = {
    getFeaturedWorks: () => apiClient.get('/works/', {
        params: {
            is_featured: true,
            limit: 3
        }
    }),
    getLatestBooks: () => apiClient.get('/books/', {
        params: {
            limit: 2,
            ordering: '-created_at'
        }
    })
};

export const contactApi = {
    create: (data) => apiClient.post('/contacts/', data),
};

export const aboutApi = {
    getAll: () => apiClient.get('/about/'),
};

export const servicesApi = {
    getAll: () => apiClient.get('/services/'),
};

export const testimonialApi = {
    getAll: () => apiClient.get('/testimonials/'),
};

export const skillsApi = {
    getAll: () => apiClient.get('/skills/'),
};

export const socialLinksApi = {
    getAll: () => apiClient.get('/social-links/'),
}; 