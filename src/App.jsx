import React, { useState, useEffect } from 'react';

// --- Icon Components (for the sidebar) ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const DevsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const MyRequestsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const AddRequestIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const HistoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const AboutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const AdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;


// Main Application Component
export default function App() {
  const [page, setPage] = useState('loading'); // loading, welcome, register, login, dashboard
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Persistent Login: Check for token on initial app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setPage('dashboard');
    } else {
      setPage('welcome');
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setPage('welcome');
  };

  const renderPage = () => {
    if (page === 'loading') {
      return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }
    switch (page) {
      case 'register':
        return <RegisterPage setPage={setPage} />;
      case 'login':
        return <LoginPage setPage={setPage} setUser={setUser} setToken={setToken} />;
      case 'dashboard':
        return <DashboardPage handleLogout={handleLogout} user={user} token={token} />;
      case 'welcome':
      default:
        return <WelcomePage setPage={setPage} />;
    }
  };

  return <div className="bg-gray-900 text-white min-h-screen font-inter">{renderPage()}</div>;
}

// --- Auth Page Components ---
function WelcomePage({ setPage }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Welcome to WebCraft</h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl">Your one-stop solution for requesting and managing stunning, custom-built websites.</p>
            <div className="flex space-x-4">
                <button onClick={() => setPage('login')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">Login</button>
                <button onClick={() => setPage('register')} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300">Register</button>
            </div>
        </div>
    );
}

function RegisterPage({ setPage }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [registerStep, setRegisterStep] = useState(1);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setError(''); setMessage('Requesting OTP...');
        try {
            const response = await fetch('https://https://webcraft-26mt.onrender.com/api/auth/register', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to request OTP');
            setMessage(data.message); setRegisterStep(2);
        } catch (err) { setError(err.message); setMessage(''); }
    };
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError(''); setMessage('Verifying...');
        try {
            const response = await fetch('https://https://webcraft-26mt.onrender.com/api/auth/register-verify', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Verification failed');
            setMessage('Registration successful! Please login.');
            setTimeout(() => setPage('login'), 2000);
        } catch (err) { setError(err.message); setMessage(''); }
    };
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center">Create Account</h1>
                {message && <p className="text-blue-400 text-center">{message}</p>}
                {error && <p className="text-red-400 text-center">{error}</p>}
                {registerStep === 1 && (
                    <form onSubmit={handleRequestOtp} className="space-y-6">
                        <InputField label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        <InputField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="w-full py-3 px-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">Get Verification OTP</button>
                    </form>
                )}
                {registerStep === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                         <p className="text-center text-gray-300">An OTP has been sent to {email}.</p>
                        <InputField label="Enter OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                        <button type="submit" className="w-full py-3 px-4 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300">Verify & Register</button>
                         <button onClick={() => setRegisterStep(1)} className="text-center w-full text-sm text-gray-400 hover:underline">Entered wrong details? Go back.</button>
                    </form>
                )}
                <p className="text-center text-gray-400">Already have an account? <button onClick={() => setPage('login')} className="font-medium text-blue-400 hover:underline">Login</button></p>
            </div>
        </div>
    );
}

function LoginPage({ setPage, setUser, setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setMessage('Logging in...');
    try {
      const response = await fetch('https://https://webcraft-26mt.onrender.com/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      // Save token and user to localStorage for persistent login
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setToken(data.token);
      setPage('dashboard');
    } catch (err) { setError(err.message); setMessage(''); }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        {message && <p className="text-blue-400 text-center">{message}</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <InputField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full py-3 px-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">Login</button>
        </form>
        <p className="text-center text-gray-400">Don't have an account? <button onClick={() => setPage('register')} className="font-medium text-blue-400 hover:underline">Register</button></p>
      </div>
    </div>
  );
}

// --- DASHBOARD COMPONENTS ---
function DashboardPage({ handleLogout, user, token }) {
  const [activeView, setActiveView] = useState('home');
  const renderView = () => {
    switch (activeView) {
      case 'developers': return <DevelopersView token={token}/>;
      case 'my-requests': return <MyRequestsView token={token} />;
      case 'add-request': return <AddRequestView setActiveView={setActiveView} token={token} />;
      case 'history': return <HistoryView />;
      case 'about': return <AboutView />;
      case 'help': return <HelpView />;
      case 'admin': return <AdminView token={token} />;
      case 'home':
      default:
        return <HomeView user={user} />;
    }
  };
  return (
    <div className="flex h-screen bg-gray-800">
      <Sidebar setActiveView={setActiveView} activeView={activeView} handleLogout={handleLogout} user={user} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{renderView()}</main>
    </div>
  );
}

function Sidebar({ setActiveView, activeView, handleLogout, user }) {
  const NavItem = ({ icon, label, view }) => (
    <button onClick={() => setActiveView(view)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200 ${ activeView === view ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
      {icon} <span className="font-medium">{label}</span>
    </button>
  );
  return (
    <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">WebCraft</div>
        <nav className="space-y-2">
          <NavItem icon={<HomeIcon />} label="Home" view="home" />
          <NavItem icon={<DevsIcon />} label="Developers" view="developers" />
          <NavItem icon={<MyRequestsIcon />} label="My Requests" view="my-requests" />
          <NavItem icon={<AddRequestIcon />} label="Add Request" view="add-request" />
          <NavItem icon={<HistoryIcon />} label="History" view="history" />
          <NavItem icon={<AboutIcon />} label="About" view="about" />
          {user && user.role === 'admin' && <NavItem icon={<AdminIcon />} label="Admin Panel" view="admin" />}
        </nav>
      </div>
      <div className="space-y-2">
         <a href="mailto:webofficial0412@gmail.com" className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200 text-gray-400 hover:bg-gray-700 hover:text-white">
            <HelpIcon /> <span className="font-medium">Help</span>
        </a>
        <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200 text-gray-400 hover:bg-gray-700 hover:text-white">
            <LogoutIcon /> <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

// --- Dashboard View Components ---
function HomeView({ user }) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-2">Dashboard Home</h1>
      <p className="text-lg text-gray-400">Welcome back, {user ? user.name : 'Guest'}!</p>
    </div>
  );
}

function DevelopersView({token}) {
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDevelopers = async () => {
            try {
                const response = await fetch('https://https://webcraft-26mt.onrender.com/api/admin/developers');
                const data = await response.json();
                if (!response.ok) throw new Error('Failed to fetch developers');
                setDevelopers(data);
            } catch (error) { console.error(error); } finally { setLoading(false); }
        };
        fetchDevelopers();
    }, []);

    if (loading) return <p>Loading developers...</p>;
    return (
        <div>
            <h1 className="text-4xl font-bold text-white mb-6">Our Developers</h1>
            {developers.length === 0 ? <p className="text-gray-400">No developers have been added yet.</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {developers.map(dev => (
                        <div key={dev.uniqueId} className="bg-gray-900 p-6 rounded-lg text-center">
                            <img src={`https://placehold.co/100x100/7c3aed/ffffff?text=${dev.name.substring(0,2).toUpperCase()}`} alt={dev.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700"/>
                            <h3 className="text-xl font-bold text-white">{dev.name}</h3>
                            <p className="text-blue-400">{dev.role}</p>
                            <p className="text-gray-500 text-sm mt-1">ID: {dev.uniqueId}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function MyRequestsView({ token }) {
    const [activeTab, setActiveTab] = useState('Pending');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://https://webcraft-26mt.onrender.com/api/requests/my-requests', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (!response.ok) throw new Error('Failed to fetch requests');
                setRequests(data);
            } catch (error) { console.error(error); } finally { setLoading(false); }
        };
        if (token) fetchRequests();
    }, [token]);

    const filteredRequests = requests.filter(req => req.status === activeTab);
    const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString() : 'N/A';

    const TabButton = ({ label }) => (
        <button onClick={() => setActiveTab(label)} className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === label ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>{label}</button>
    );

    return (
        <div>
            <h1 className="text-4xl font-bold text-white mb-6">My Requests</h1>
            <div className="flex space-x-2 border-b border-gray-700 mb-6">
                <TabButton label="Pending" /> <TabButton label="Approved" /> <TabButton label="Completed" /> <TabButton label="Rejected" />
            </div>
            {loading ? <p>Loading requests...</p> : (
                filteredRequests.length === 0 ? <p className="text-gray-400">You have no {activeTab.toLowerCase()} requests.</p> : (
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                                <tr>
                                    <th className="p-3">Website Name</th><th className="p-3">Requested On</th><th className="p-3">Submission Date</th><th className="p-3">Amount ($)</th><th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map(req => (
                                    <tr key={req._id} className="border-b border-gray-700">
                                        <td className="p-3 font-medium">{req.websiteName}</td><td className="p-3">{formatDate(req.createdAt)}</td><td className="p-3">{formatDate(req.submissionDate)}</td><td className="p-3">{req.amount || 'N/A'}</td><td className="p-3">{req.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            )}
        </div>
    );
}

function AddRequestView({ setActiveView, token }) {
    const [websiteName, setWebsiteName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setMessage('Submitting...');
        try {
            const response = await fetch('https://https://webcraft-26mt.onrender.com/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ websiteName, description }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to submit request');
            setMessage('Request submitted successfully! Redirecting...');
            setTimeout(() => setActiveView('my-requests'), 2000);
        } catch (err) { setError(err.message); setMessage(''); }
    };
    return (
        <div>
            <h1 className="text-4xl font-bold text-white mb-6">Add a New Request</h1>
            <div className="max-w-2xl bg-gray-900 p-8 rounded-lg">
                {message && <p className="text-green-400 text-center text-lg">{message}</p>}
                {error && <p className="text-red-400 text-center text-lg">{error}</p>}
                {!message && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField label="Website Name" type="text" value={websiteName} onChange={(e) => setWebsiteName(e.target.value)} required />
                        <div>
                            <label className="text-sm font-bold text-gray-300 mb-2 block">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="6" placeholder="Describe the website you want..." className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <button type="submit" className="w-full py-3 px-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">Submit Request</button>
                    </form>
                )}
            </div>
        </div>
    );
}

// --- NEW ADMIN VIEW ---
function AdminView({ token }) {
    return (
        <div>
            <h1 className="text-4xl font-bold text-white mb-6">Admin Panel</h1>
            <div className="space-y-10">
                <AdminRequestManager token={token} />
                <AdminDeveloperManager token={token} />
            </div>
        </div>
    );
}

function AdminRequestManager({ token }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllRequests = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://https://webcraft-26mt.onrender.com/api/admin/requests', { headers: { 'Authorization': `Bearer ${token}` } });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch requests');
            setRequests(data);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    useEffect(() => {
        if(token) fetchAllRequests();
    }, [token]);

    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await fetch(`http://https://webcraft-26mt.onrender.com/api/admin/requests/${id}`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error('Update failed');
            fetchAllRequests(); // Refresh list after update
        } catch (error) { console.error(error); }
    };
    
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">Manage User Requests</h2>
            {loading ? <p>Loading requests...</p> : (
                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                            <tr>
                                <th className="p-3">User</th><th className="p-3">Website</th><th className="p-3">Requested On</th><th className="p-3">Status</th><th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => (
                                <tr key={req._id} className="border-b border-gray-700">
                                    <td className="p-3">{req.user?.name || 'N/A'}<br/><span className="text-xs text-gray-500">{req.user?.email}</span></td>
                                    <td className="p-3 font-medium">{req.websiteName}</td>
                                    <td className="p-3">{formatDate(req.createdAt)}</td>
                                    <td className="p-3">
                                        <select value={req.status} onChange={(e) => handleUpdate(req._id, { status: e.target.value })} className="bg-gray-700 border border-gray-600 rounded p-1">
                                            <option>Pending</option><option>Approved</option><option>Completed</option><option>Rejected</option>
                                        </select>
                                    </td>
                                    <td className="p-3 text-sm">// Add actions like view details</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

function AdminDeveloperManager({ token }) {
    const [developers, setDevelopers] = useState([]);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [uniqueId, setUniqueId] = useState('');

    const fetchDevelopers = async () => {
        try {
            const response = await fetch('https://https://webcraft-26mt.onrender.com/api/admin/developers');
            const data = await response.json();
            if (!response.ok) throw new Error('Failed to fetch developers');
            setDevelopers(data);
        } catch (error) { console.error(error); }
    };
    
    useEffect(() => {
        fetchDevelopers();
    }, []);

    const handleAddDeveloper = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://https://webcraft-26mt.onrender.com/api/admin/developers', {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ name, role, uniqueId }),
            });
            if (!response.ok) throw new Error('Failed to add developer');
            setName(''); setRole(''); setUniqueId('');
            fetchDevelopers(); // Refresh list
        } catch (error) { console.error(error); }
    };

    const handleDeleteDeveloper = async (id) => {
        if (!window.confirm('Are you sure you want to remove this developer?')) return;
        try {
            const response = await fetch(`http://https://webcraft-26mt.onrender.com/api/admin/developers/${id}`, {
                method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to delete developer');
            fetchDevelopers(); // Refresh list
        } catch (error) { console.error(error); }
    };

    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">Manage Developers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Add Developer Form */}
                <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Add New Developer</h3>
                    <form onSubmit={handleAddDeveloper} className="space-y-4">
                        <InputField label="Developer Name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                        <InputField label="Role (e.g., Frontend)" type="text" value={role} onChange={e => setRole(e.target.value)} required />
                        <InputField label="Unique ID (e.g., 1004)" type="number" value={uniqueId} onChange={e => setUniqueId(e.target.value)} required />
                        <button type="submit" className="w-full py-2 px-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Add Developer</button>
                    </form>
                </div>
                {/* List of Developers */}
                <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Current Developers</h3>
                    <ul className="space-y-3">
                        {developers.map(dev => (
                            <li key={dev._id} className="flex justify-between items-center bg-gray-800 p-3 rounded">
                                <div>
                                    <p className="font-semibold">{dev.name} <span className="text-sm text-gray-400">({dev.uniqueId})</span></p>
                                    <p className="text-xs text-blue-400">{dev.role}</p>
                                </div>
                                <button onClick={() => handleDeleteDeveloper(dev._id)} className="text-red-500 hover:text-red-400 text-xs font-semibold">REMOVE</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function HistoryView() { return <div><h1 className="text-4xl font-bold text-white">Request History</h1></div>; }
function AboutView() { return <div><h1 className="text-4xl font-bold text-white">About WebCraft</h1></div>; }
function HelpView() { return <div><h1 className="text-4xl font-bold text-white">Help & Support</h1></div>; }

// --- Utility Components ---
function InputField({ label, type, value, onChange, required }) {
    return (
        <div>
            <label className="text-sm font-bold text-gray-300 mb-2 block">{label}</label>
            <input type={type} value={value} onChange={onChange} required={required} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
    );
}

