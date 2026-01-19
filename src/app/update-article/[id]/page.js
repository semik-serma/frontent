'use client'
import axios from 'axios';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { FaPen } from "react-icons/fa";
import { useParams } from 'next/navigation';
import { Camera, Save, X, User, FileText, Image as ImageIcon } from 'lucide-react';
import { useRef } from "react";
 

const page = () => {
    const router = useRouter();
    const param=useParams()
    const id=param.id

        const [formData, setFormData] = useState({
        title: '',
        author: '',
        image: null,
        content: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [activeSection, setActiveSection] = useState('title');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    



     const fetchdata=async()=>{
        try {
            const backendarticledata=await axios.get(api.article.displaysingle(id))
            console.log(backendarticledata)
            setFormData({
        title: backendarticledata.data.data.title,
        author: backendarticledata.data.data.author,
        image: backendarticledata.data.data.image,
        content:backendarticledata.data.data.content 
            })
            setImagePreview(backendarticledata.data.data.image)

            
            
        } catch (error) {
            console.log('error at fetch data')
        }
    }
    
    useEffect(()=>{
        fetchdata()
    },[])
  

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");   // redirect if not logged in
    }
  }, []);


    const handleInputChange = (e) => {
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
        if (!file) return;

        // Update form data
        setFormData(prev => ({
            ...prev,
            image: file
        }));

        // Create browser preview URL
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);

        if (errors.image) {
            setErrors(prev => ({ ...prev, image: "" }));
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, image: null }));
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.author.trim()) {
            newErrors.author = 'Author is required';
        }
        if (!formData.content.trim()) {
            newErrors.content = 'Content is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // Find first error and scroll to that section
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField) {
                setActiveSection(firstErrorField);
                setTimeout(() => {
                    document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
            return;
        }

        try {
            setLoading(true);
            
            // Create FormData to handle file upload
            const submitFormData = new FormData();
            submitFormData.append('title', formData.title);
            submitFormData.append('author', formData.author);
            submitFormData.append('content', formData.content);
            
            if (formData.image) {
                submitFormData.append('image', formData.image);
            }

            const response = await axios.put(
                api.article.update(id), 
                submitFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            
            console.log('Success:', response.data);
            alert('Article updated successfully!');
            
            // Reset form
            setFormData({
                title: '',
                author: '',
                image: null,
                content: ''
            });
            setImagePreview(null);
            setActiveSection('title');
            
        } catch (error) {
            console.error('Error creating article:', error);
            alert('Failed to update article. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        }
        
        // Cleanup preview URL on unmount
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [router, imagePreview]);

    const handleSectionChange = (section) => {
        setActiveSection(section);

        // Scroll to the section
        setTimeout(() => {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Focus on the input field
                let inputElement;
                switch (section) {
                    case 'title':
                        inputElement = element.querySelector('input');
                        break;
                    case 'author':
                        inputElement = element.querySelector('input');
                        break;
                    case 'image':
                        inputElement = element.querySelector('input[type="file"]');
                        break;
                    case 'content':
                        inputElement = element.querySelector('textarea');
                        break;
                }
                if (inputElement) {
                    setTimeout(() => inputElement.focus(), 100);
                }
            }
        }, 100);
    };
  return (
    <div>
         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-1/4">
                        <div className="bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-2xl p-6 border border-gray-200 sticky top-8 transition-all duration-300 hover:shadow-2xl">
                            <div className="mb-6 pb-4 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <FileText className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">Article Sections</span>
                                </h2>
                            </div>
                            <nav className="space-y-1">
                                <button
                                    type="button"
                                    onClick={() => handleSectionChange('title')}
                                    className={`w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 flex items-center gap-3 text-sm font-medium ${activeSection === 'title' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' : 'text-gray-700'} group`}
                                    aria-label="Go to title field"
                                >
                                    <div className={`p-2 rounded-lg transition-colors ${activeSection === 'title' ? 'bg-blue-200' : 'bg-blue-100'} group-hover:bg-blue-200`}>
                                        <FileText className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className={`transition-colors ${activeSection === 'title' ? 'text-blue-700' : 'group-hover:text-blue-700'}`}>Title</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSectionChange('author')}
                                    className={`w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 flex items-center gap-3 text-sm font-medium ${activeSection === 'author' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' : 'text-gray-700'} group`}
                                    aria-label="Go to author field"
                                >
                                    <div className={`p-2 rounded-lg transition-colors ${activeSection === 'author' ? 'bg-blue-200' : 'bg-blue-100'} group-hover:bg-blue-200`}>
                                        <User className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className={`transition-colors ${activeSection === 'author' ? 'text-blue-700' : 'group-hover:text-blue-700'}`}>Author</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSectionChange('image')}
                                    className={`w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 flex items-center gap-3 text-sm font-medium ${activeSection === 'image' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' : 'text-gray-700'} group`}
                                    aria-label="Go to featured image field"
                                >
                                    <div className={`p-2 rounded-lg transition-colors ${activeSection === 'image' ? 'bg-blue-200' : 'bg-blue-100'} group-hover:bg-blue-200`}>
                                        <ImageIcon className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className={`transition-colors ${activeSection === 'image' ? 'text-blue-700' : 'group-hover:text-blue-700'}`}>Featured Image</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSectionChange('content')}
                                    className={`w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 flex items-center gap-3 text-sm font-medium ${activeSection === 'content' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' : 'text-gray-700'} group`}
                                    aria-label="Go to content field"
                                >
                                    <div className={`p-2 rounded-lg transition-colors ${activeSection === 'content' ? 'bg-blue-200' : 'bg-blue-100'} group-hover:bg-blue-200`}>
                                        <FileText className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className={`transition-colors ${activeSection === 'content' ? 'text-blue-700' : 'group-hover:text-blue-700'}`}>Content</span>
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
                                        <FileText className="w-8 h-8 text-blue-600" />
                                        Create New Article
                                    </h1>
                                    <p className="text-gray-600 mt-2">Share your knowledge and experience with the world</p>
                                </div>
                            </div>

                            <form className="space-y-8" onSubmit={handleSubmit}>
                                {/* Title Field */}
                                <div id="title" className="space-y-2">
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
                                            onChange={handleInputChange}
                                            required
                                            className={`w-full pl-10 pr-3 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="Enter article title..."
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Author Field */}
                                <div id="author" className="space-y-2">
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
                                            onChange={handleInputChange}
                                            required
                                            className={`w-full pl-10 pr-3 py-3 border ${errors.author ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                            placeholder="Enter author name..."
                                        />
                                        {errors.author && (
                                            <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Image Upload Field */}
                                <div id="image" className="space-y-2">
                                    <label htmlFor="image" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                        Featured Image
                                    </label>
                                    <div className="mt-1 space-y-4">
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <div 
                                            className="flex flex-col items-center justify-center w-full min-h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <div className="flex flex-col items-center justify-center pt-8 pb-6 px-4 text-center">
                                                <Camera className="w-12 h-12 mb-4 text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 mb-4">
                                                    PNG, JPG, GIF (MAX. 5MB)
                                                </p>
                                                <div className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-2">
                                                    Select Image
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-gray-600 font-medium">Image Preview:</p>
                                                {imagePreview && (
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                                                    >
                                                        <X className="w-4 h-4" />
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <div className="relative inline-block">
                                                {imagePreview && (
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="max-h-64 rounded-lg object-cover border border-gray-200"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {errors.image && (
                                        <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                                    )}
                                </div>

                                {/* Content Field */}
                                <div id="content" className="space-y-2">
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
                                            onChange={handleInputChange}
                                            required
                                            rows={12}
                                            className={`w-full pl-10 pr-3 py-3 border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none`}
                                            placeholder="Write your article content here..."
                                        />
                                        {errors.content && (
                                            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                    <div></div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg"
                                    >
                                        {loading ? (
                                            'Creating...'
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                update article
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
    </div>
  )
}

export default page
