'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit3, Eye, Trash2, Search, Plus, Calendar, User, FileText } from 'lucide-react';

export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data for articles - in a real app, this would come from your API
    useEffect(() => {
        const mockArticles = [
            {
                id: 1,
                title: 'Getting Started with React',
                author: 'Alex Johnson',
                content: 'React is a JavaScript library for building user interfaces...',
                date: '2023-06-15',
                status: 'published',
                image: null
            },
            {
                id: 2,
                title: 'Advanced JavaScript Concepts',
                author: 'Sarah Miller',
                content: 'JavaScript is a versatile programming language...',
                date: '2023-07-22',
                status: 'draft',
                image: null
            },
            {
                id: 3,
                title: 'CSS Grid vs Flexbox',
                author: 'Michael Chen',
                content: 'Understanding when to use CSS Grid and Flexbox...',
                date: '2023-08-10',
                status: 'published',
                image: null
            },
            {
                id: 4,
                title: 'Next.js Best Practices',
                author: 'Emma Davis',
                content: 'Learn the best practices for building with Next.js...',
                date: '2023-09-05',
                status: 'published',
                image: null
            }
        ];

        // Simulate API call
        setTimeout(() => {
            setArticles(mockArticles);
            setLoading(false);
        }, 500);
    }, []);

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            setArticles(articles.filter(article => article.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Manage Articles</h1>
                            <p className="text-gray-600 mt-1">View, edit, and manage your articles</p>
                        </div>
                        <Link
                            href="/create-article"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors justify-center"
                        >
                            <Plus className="w-4 h-4" />
                            Create New Article
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {filteredArticles.length === 0 ? (
                            <div className="text-center py-12">
                                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No articles found</h3>
                                <p className="text-gray-500">Try adjusting your search or create a new article.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Author
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredArticles.map((article) => (
                                            <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{article.title}</div>
                                                    <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                                                        {article.content.substring(0, 100)}...
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <User className="h-4 w-4 text-gray-400 mr-2" />
                                                        <div className="text-sm text-gray-900">{article.author}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(article.date).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${article.status === 'published'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {article.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Link
                                                            href={`/update-article?id=${article.id}`}
                                                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                                                            title="Edit Article"
                                                        >
                                                            <Edit3 className="h-4 w-4" />
                                                        </Link>
                                                        <Link
                                                            href={`/dashboard`} // In a real app, this would be a view article page
                                                            className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors"
                                                            title="View Article"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(article.id)}
                                                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                                                            title="Delete Article"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Stats Summary */}
                {!loading && filteredArticles.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <FileText className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Articles</p>
                                    <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <FileText className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Published</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {articles.filter(a => a.status === 'published').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 bg-yellow-100 rounded-lg">
                                    <FileText className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Drafts</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {articles.filter(a => a.status === 'draft').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}