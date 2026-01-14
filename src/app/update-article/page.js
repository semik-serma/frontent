'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Camera, Save, X, User, FileText, Image as ImageIcon, Edit3 } from 'lucide-react';

export default function UpdateArticlePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const articleId = searchParams.get('id'); // Get article ID from URL params

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        image: null
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoadingArticle, setIsLoadingArticle] = useState(true);

    // Function to focus on specific input fields
    const focusOnField = (fieldId) => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.focus();
            // Scroll to the element if needed
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // Load existing article data when component mounts
    useEffect(() => {
        if (articleId) {
            // In a real application, you would fetch the article data from your API
            // For now, I'll simulate loading with mock data
            const loadArticle = async () => {
                try {
                    // Simulate API call delay
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Mock article data - in real app, this would come from your API
                    setFormData({
                        title: 'Sample Article Title',
                        content: 'This is the content of the sample article. You can edit this content as needed.',
                        author: 'Sample Author',
                        image: null
                    });

                    setIsLoadingArticle(false);
                } catch (error) {
                    console.error('Error loading article:', error);
                    setIsLoadingArticle(false);
                }
            };

            loadArticle();
        }
        // If no article ID is provided, show a message instead of redirecting
        else {
            setIsLoadingArticle(false);
        }
    }, [articleId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Please select an image file (JPEG, PNG, GIF)'
                }));
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    image: 'File size exceeds 5MB limit'
                }));
                return;
            }

            setFormData(prev => ({
                ...prev,
                image: file
            }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);

            // Clear image error if any
            if (errors.image) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.image;
                    return newErrors;
                });
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Content is required';
        }

        if (!formData.author.trim()) {
            newErrors.author = 'Author is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        // Here you would typically send the data to your backend to update the article
        // For now, we'll just log the data and redirect
        console.log('Updated article data:', { ...formData, id: articleId });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setLoading(false);
        alert('Article updated successfully!');
        router.push('/dashboard');
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            image: null
        }));
        setPreviewImage(null);

        // Clear file input
        const fileInput = document.getElementById('image');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    if (isLoadingArticle) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </div>
        );
    }

    // If no article ID is provided, show a message
    if (!articleId) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-white shadow-xl rounded-2xl p-12 border border-gray-100">
                        <Edit3 className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Update Article</h1>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Please select an article to update by providing an article ID in the URL.
                        </p>
                        <div className="space-y-4">
                            <button
                                onClick={() => router.push('/articles')}
                                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all flex items-center gap-2 shadow-lg"
                            >
                                <Edit3 className="w-4 h-4" />
                                View Articles
                            </button>
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors flex items-center gap-2 ml-4"
                            >
                                <X className="w-4 h-4" />
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-1/4">
                        <div className="bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-2xl p-6 border border-gray-200 sticky top-8 transition-all duration-300 hover:shadow-2xl">
                            <div className="mb-6 pb-4 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Edit3 className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">Update Sections</span>
                                </h2>
                            </div>
                            <nav className="space-y-1">
                                <button
                                    type="button"
                                    onClick={() => focusOnField('title')}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 flex items-center gap-3 text-sm font-medium text-gray-700 group"
                                >
                                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                        <FileText className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="group-hover:text-blue-700 transition-colors">Title</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => focusOnField('author')}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 flex items-center gap-3 text-sm font-medium text-gray-700 group"
                                >
                                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                        <User className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="group-hover:text-blue-700 transition-colors">Author</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => focusOnField('image')}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 flex items-center gap-3 text-sm font-medium text-gray-700 group"
                                >
                                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                        <ImageIcon className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="group-hover:text-blue-700 transition-colors">Featured Image</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => focusOnField('content')}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 flex items-center gap-3 text-sm font-medium text-gray-700 group"
                                >
                                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                        <FileText className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="group-hover:text-blue-700 transition-colors">Content</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Form Content */}
                    <div className="lg:w-3/4">
                        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                        <Edit3 className="w-8 h-8 text-blue-600" />
                                        Update Article
                                    </h1>
                                    <p className="text-gray-600 mt-2">Edit your existing article content</p>
                                </div>
                                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    ID: {articleId}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Title Field */}
                                <div className="space-y-2">
                                    <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                        Title *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FileText className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-3 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                            placeholder="Enter your article title..."
                                        />
                                    </div>
                                    {errors.title && (
                                        <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                            <X className="w-4 h-4" />
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Author Field */}
                                <div className="space-y-2">
                                    <label htmlFor="author" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                        Author *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="author"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-3 py-3 border ${errors.author ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                            placeholder="Enter author name..."
                                        />
                                    </div>
                                    {errors.author && (
                                        <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                            <X className="w-4 h-4" />
                                            {errors.author}
                                        </p>
                                    )}
                                </div>

                                {/* Image Upload Field */}
                                <div className="space-y-2">
                                    <label htmlFor="image" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                        Featured Image
                                    </label>
                                    <div className="mt-1 space-y-4">
                                        <div className="flex flex-col items-center justify-center w-full min-h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-8 pb-6 px-4 text-center">
                                                <Camera className="w-12 h-12 mb-4 text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 mb-4">
                                                    PNG, JPG, GIF (MAX. 5MB)
                                                </p>
                                                <input
                                                    id="image"
                                                    name="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor="image"
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-2"
                                                >
                                                    <Camera className="w-4 h-4" />
                                                    {previewImage ? 'Change Image' : 'Select Image'}
                                                </label>
                                            </div>
                                        </div>

                                        {errors.image && (
                                            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                                <X className="w-4 h-4" />
                                                {errors.image}
                                            </p>
                                        )}

                                        {previewImage && (
                                            <div className="mt-4 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-600 font-medium">Image Preview:</p>
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                                                    >
                                                        <X className="w-4 h-4" />
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="relative inline-block">
                                                    <img
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="max-h-64 rounded-lg object-cover border border-gray-200"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content Field */}
                                <div className="space-y-2">
                                    <label htmlFor="content" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                        Content *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                                            <FileText className="h-5 w-5 text-gray-400 mt-1" />
                                        </div>
                                        <textarea
                                            id="content"
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            rows={12}
                                            className={`w-full pl-10 pr-3 py-3 border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none`}
                                            placeholder="Write your article content here..."
                                        />
                                    </div>
                                    {errors.content && (
                                        <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                            <X className="w-4 h-4" />
                                            {errors.content}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => router.push('/dashboard')}
                                        className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors flex items-center gap-2"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <Edit3 className="w-4 h-4" />
                                                Update Article
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}