'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { api } from '@/lib/api';
import { ArrowLeft, MessageCircle, Calendar, User } from 'lucide-react';
import Link from 'next/link';

function CommentContent() {
    const { id } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                setLoading(true);
                const endpoint = type === 'before' 
                    ? api.comment.beforelogincomment(id)
                    : api.comment.afterlogincommentsgetid(id);
                
                const response = await axios.get(endpoint);
                setComment(response.data);
            } catch (err) {
                console.error('Error fetching comment:', err);
                setError('Failed to load comment details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchComment();
        }
    }, [id, type]);

    const formatCommentDate = (dateString) => {
        if (!dateString) return 'Just now';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Just now';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !comment) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="text-red-500 mb-4 text-xl font-semibold">{error || 'Comment not found'}</div>
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
                >
                    <ArrowLeft className="h-5 w-5" /> Back
                </button>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                {comment.user ? comment.user.charAt(0).toUpperCase() : 'V'}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{comment.user || 'Visitor'}</h1>
                                <div className="flex items-center gap-2 text-blue-100 text-sm mt-1">
                                    <Calendar className="h-4 w-4" />
                                    {formatCommentDate(comment.createdAt)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="flex items-center gap-2 text-blue-600 mb-6">
                            <MessageCircle className="h-6 w-6" />
                            <span className="font-bold text-lg uppercase tracking-wider text-gray-400">Full Comment</span>
                        </div>
                        
                        <p className="text-gray-800 text-xl leading-relaxed whitespace-pre-wrap">
                            {comment.comment}
                        </p>

                        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 italic">Thank you for sharing your thoughts!</span>
                            </div>
                            <div className="flex gap-4">
                                <Link 
                                    href="/"
                                    className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    Dismiss
                                </Link>
                                <button 
                                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                                >
                                    Appreciate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CommentDetail() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <CommentContent />
        </Suspense>
    );
}
