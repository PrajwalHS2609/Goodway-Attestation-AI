import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Appointment, TrackingItem, BusinessSettings } from '../types';
import { formatWhatsAppLink, formatDateDisplay } from '../utils/helpers';
import {
  X,
  Lock,
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  Search,
  Filter,
  CheckCircle,
  FileText,
  AlertCircle,
  Plus,
  Trash2,
  Save,
  UserCheck,
  Building2,
  ShieldAlert,
  ArrowUpRight,
  Eye
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    appointments,
    updateAppointment,
    deleteAppointment,
    trackings,
    addOrUpdateTracking,
    settings,
    updateSettings,
    showToast
  } = useApp();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Tabs: 'appointments' | 'trackings' | 'availability' | 'settings'
  const [activeTab, setActiveTab] = useState<'appointments' | 'trackings' | 'availability' | 'settings'>('appointments');

  // Appointment filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected appointment for detail / edit modal
  const [selectedApp, setSelectedApp] = useState<Appointment | null>(null);
  const [newNote, setNewNote] = useState('');

  // Local settings editor
  const [localSettings, setLocalSettings] = useState<BusinessSettings>(settings);

  // New holiday date to block
  const [newBlockedDate, setNewBlockedDate] = useState('');

  // Trackings editor state
  const [selectedTracking, setSelectedTracking] = useState<TrackingItem | null>(null);
  const [newTrackingLog, setNewTrackingLog] = useState({
    status: '',
    date: new Date().toISOString().split('T')[0],
    location: 'Goodway Malleshwaram Office',
    notes: ''
  });

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'goodway2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Use default: admin123');
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleStatusChange = (appId: string, newStatus: Appointment['status']) => {
    updateAppointment(appId, { status: newStatus });
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    showToast(`Appointment ${appId} marked as ${newStatus}`);
  };

  const handleAssignStaff = (appId: string, staffName: string) => {
    updateAppointment(appId, { assignedStaff: staffName });
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, assignedStaff: staffName });
    }
    showToast(`Staff assigned: ${staffName}`);
  };

  const handleAddNote = (appId: string) => {
    if (!newNote.trim()) return;
    const currentNotes = selectedApp?.notes || [];
    const updatedNotes = [...currentNotes, `${new Date().toLocaleDateString('en-IN')}: ${newNote.trim()}`];
    updateAppointment(appId, { notes: updatedNotes });
    if (selectedApp) {
      setSelectedApp({ ...selectedApp, notes: updatedNotes });
    }
    setNewNote('');
    showToast('Note appended to appointment record.');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    showToast('Business & availability settings updated successfully.');
  };

  const handleAddBlockedDate = () => {
    if (!newBlockedDate) return;
    if (localSettings.blockedDates.includes(newBlockedDate)) return;
    const updatedDates = [...localSettings.blockedDates, newBlockedDate];
    const newS = { ...localSettings, blockedDates: updatedDates };
    setLocalSettings(newS);
    updateSettings(newS);
    setNewBlockedDate('');
    showToast(`Date ${newBlockedDate} added to blocked calendar.`);
  };

  const handleRemoveBlockedDate = (dateToRemove: string) => {
    const updatedDates = localSettings.blockedDates.filter((d) => d !== dateToRemove);
    const newS = { ...localSettings, blockedDates: updatedDates };
    setLocalSettings(newS);
    updateSettings(newS);
    showToast(`Date ${dateToRemove} removed from blocked calendar.`);
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter((app) => {
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    if (serviceFilter !== 'all' && !app.service.toLowerCase().includes(serviceFilter.toLowerCase())) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        app.id.toLowerCase().includes(q) ||
        app.customer.fullName.toLowerCase().includes(q) ||
        app.customer.mobile.includes(q) ||
        app.customer.email.toLowerCase().includes(q) ||
        app.destinationCountry.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#0B1F3A] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1357A6] flex items-center justify-center text-[#D6A84F]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#D6A84F]">
                Goodway Attestation · Staff Portal
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Operations & Management Dashboard
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 max-w-md mx-auto my-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#1357A6] flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Restricted Staff Access</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your administrative authorization code to view customer appointments and dossiers.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. admin123)..."
                  className="w-full p-3.5 rounded-xl border border-slate-300 text-center font-mono text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="text-xs text-red-600 font-semibold">{authError}</div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#1357A6] hover:bg-[#1976D2] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
              >
                Authenticate
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={handleQuickDemoLogin}
                className="text-xs text-slate-400 hover:text-[#1357A6] underline cursor-pointer"
              >
                Quick Demo Access (Bypass Login)
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs Bar */}
            <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 bg-slate-100 border-b border-slate-200 shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`py-2.5 px-4 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'appointments'
                    ? 'bg-white text-[#0B1F3A] border-t-2 border-x border-slate-200 border-t-[#1357A6] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Appointments & Bookings ({appointments.length})
              </button>
              <button
                onClick={() => setActiveTab('trackings')}
                className={`py-2.5 px-4 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'trackings'
                    ? 'bg-white text-[#0B1F3A] border-t-2 border-x border-slate-200 border-t-[#1357A6] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Document Trackings ({trackings.length})
              </button>
              <button
                onClick={() => setActiveTab('availability')}
                className={`py-2.5 px-4 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'availability'
                    ? 'bg-white text-[#0B1F3A] border-t-2 border-x border-slate-200 border-t-[#1357A6] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Time Slots & Calendar
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2.5 px-4 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-white text-[#0B1F3A] border-t-2 border-x border-slate-200 border-t-[#1357A6] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Business Info & CMS
              </button>
            </div>

            {/* TAB 1: Appointments Management */}
            {activeTab === 'appointments' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Search and Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-5 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search ID, customer name, mobile, email..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#1357A6]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#1357A6]"
                    >
                      <option value="all">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Documents Requested">Documents Requested</option>
                      <option value="Documents Received">Documents Received</option>
                      <option value="Processing">Processing</option>
                      <option value="Ready">Ready</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="sm:col-span-4 text-right flex items-center justify-end text-xs text-slate-500">
                    Showing <strong className="mx-1 text-slate-900">{filteredAppointments.length}</strong> bookings
                  </div>
                </div>

                {/* Table of Appointments */}
                <div className="border border-slate-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                      <tr>
                        <th className="p-3">Ref ID & Date</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Service & Country</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAppointments.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3">
                            <div className="font-bold text-[#1357A6] font-mono">{app.id}</div>
                            <div className="text-[11px] text-slate-400">
                              {app.date} · {app.timeSlot}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{app.customer.fullName}</div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {app.customer.mobile}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-semibold text-slate-800">{app.service}</div>
                            <div className="text-[11px] text-slate-500">{app.destinationCountry} ({app.documentType})</div>
                          </td>
                          <td className="p-3">
                            <span className="font-medium text-slate-700">{app.appointmentType}</span>
                          </td>
                          <td className="p-3">
                            <select
                              value={app.status}
                              onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                              className="text-[11px] font-bold py-1 px-2 rounded-lg border border-slate-300 bg-white"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Documents Requested">Docs Requested</option>
                              <option value="Documents Received">Docs Received</option>
                              <option value="Processing">Processing</option>
                              <option value="Ready">Ready</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="px-2.5 py-1 text-xs font-semibold text-[#1357A6] hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Details</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredAppointments.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-500">
                    No appointments match the selected search criteria.
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Trackings Management */}
            {activeTab === 'trackings' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Live Client Document Trackings</h3>
                    <p className="text-xs text-slate-500">Update active milestone stages and log history checkpoints.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trackings.map((item) => (
                    <div
                      key={item.trackingId}
                      className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div>
                          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Tracking ID</div>
                          <div className="text-sm font-bold text-[#1357A6] font-mono">{item.trackingId}</div>
                        </div>
                        <div className="text-right">
                          <select
                            value={item.currentStatus}
                            onChange={(e) => {
                              const updated = {
                                ...item,
                                currentStatus: e.target.value as any,
                                lastUpdated: new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                              };
                              addOrUpdateTracking(updated);
                              showToast(`Tracking ${item.trackingId} status updated to ${e.target.value}`);
                            }}
                            className="text-xs font-bold p-1 rounded border border-slate-300"
                          >
                            <option value="Received">Received</option>
                            <option value="Under Verification">Under Verification</option>
                            <option value="At Authority">At Authority</option>
                            <option value="Embassy Processing">Embassy Processing</option>
                            <option value="Ready">Ready</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </div>

                      <div className="text-xs space-y-1">
                        <div><strong className="text-slate-800">Customer:</strong> {item.customerName} ({item.customerPhone})</div>
                        <div><strong className="text-slate-800">Document:</strong> {item.documentType}</div>
                        <div><strong className="text-slate-800">Destination:</strong> {item.country}</div>
                        <div><strong className="text-slate-800">Target Date:</strong> {item.expectedCompletion || 'Open'}</div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Milestones logged: {item.history.length}</span>
                        <a
                          href={formatWhatsAppLink(
                            item.customerPhone,
                            `Hello ${item.customerName}, this is Goodway Attestation Malleshwaram. Your document dossier (${item.trackingId}) status is currently: ${item.currentStatus}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1357A6] hover:underline font-semibold flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp Update</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Availability & Hours */}
            {activeTab === 'availability' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-4xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Working Hours & Appointment Intervals</h3>
                  <p className="text-xs text-slate-500">
                    Configure opening times (handles 9:00 AM vs 9:30 AM public variations dynamically).
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700">Opening Time (24h format)</label>
                      <input
                        type="time"
                        value={localSettings.openingTime}
                        onChange={(e) => setLocalSettings({ ...localSettings, openingTime: e.target.value })}
                        className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">Closing Time (24h format)</label>
                      <input
                        type="time"
                        value={localSettings.closingTime}
                        onChange={(e) => setLocalSettings({ ...localSettings, closingTime: e.target.value })}
                        className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">Appointment Duration (Minutes)</label>
                      <input
                        type="number"
                        min={15}
                        step={5}
                        value={localSettings.appointmentDuration}
                        onChange={(e) => setLocalSettings({ ...localSettings, appointmentDuration: Number(e.target.value) })}
                        className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">Sunday Policy Note</label>
                      <input
                        type="text"
                        value={localSettings.sundayStatus}
                        onChange={(e) => setLocalSettings({ ...localSettings, sundayStatus: e.target.value })}
                        className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  {/* Blocked Dates / Holidays Manager */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-xs font-bold text-slate-800">
                      Block Office Holidays / Unavailable Dates
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={newBlockedDate}
                        onChange={(e) => setNewBlockedDate(e.target.value)}
                        className="p-2 rounded-lg border border-slate-300 text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddBlockedDate}
                        className="px-4 py-2 bg-[#1357A6] text-white rounded-lg text-xs font-bold hover:bg-[#1976D2]"
                      >
                        Block Date
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {localSettings.blockedDates.map((date) => (
                        <span
                          key={date}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold"
                        >
                          <span>{date}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveBlockedDate(date)}
                            className="hover:text-red-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1357A6] text-white font-bold text-xs rounded-lg hover:bg-[#1976D2] shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Availability Configuration</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 4: Business Info & CMS */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-4xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Business Details & Contact Info CMS</h3>
                  <p className="text-xs text-slate-500">
                    Update phone numbers, WhatsApp, and Malleshwaram office details directly without code edits.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700">Primary Phone Number</label>
                      <input
                        type="text"
                        value={localSettings.primaryPhone}
                        onChange={(e) => setLocalSettings({ ...localSettings, primaryPhone: e.target.value })}
                        className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">Secondary / Corporate Phone</label>
                      <input
                        type="text"
                        value={localSettings.secondaryPhone}
                        onChange={(e) => setLocalSettings({ ...localSettings, secondaryPhone: e.target.value })}
                        className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">WhatsApp Number (with country code)</label>
                      <input
                        type="text"
                        value={localSettings.whatsappNumber}
                        onChange={(e) => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                        className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">Inquiry Email Address</label>
                      <input
                        type="email"
                        value={localSettings.email}
                        onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                        className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700">Full Physical Address</label>
                      <textarea
                        rows={2}
                        value={localSettings.address}
                        onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                        className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">Landmark</label>
                      <input
                        type="text"
                        value={localSettings.landmark}
                        onChange={(e) => setLocalSettings({ ...localSettings, landmark: e.target.value })}
                        className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">Max File Upload Size (MB)</label>
                      <input
                        type="number"
                        min={5}
                        max={50}
                        value={localSettings.maxUploadSizeMB}
                        onChange={(e) => setLocalSettings({ ...localSettings, maxUploadSizeMB: Number(e.target.value) })}
                        className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1357A6] text-white font-bold text-xs rounded-lg hover:bg-[#1976D2] shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Information</span>
                  </button>
                </form>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Appointment Detail & Notes Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400">Appointment Dossier</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedApp.id}</h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-2">
              <div><strong className="text-slate-800">Customer:</strong> {selectedApp.customer.fullName}</div>
              <div><strong className="text-slate-800">Mobile:</strong> {selectedApp.customer.mobile}</div>
              <div><strong className="text-slate-800">Email:</strong> {selectedApp.customer.email}</div>
              <div><strong className="text-slate-800">Preferred Contact:</strong> {selectedApp.customer.preferredContactMethod}</div>
              <div><strong className="text-slate-800">Service:</strong> {selectedApp.service}</div>
              <div><strong className="text-slate-800">Document Type:</strong> {selectedApp.documentType} ({selectedApp.numberOfDocuments})</div>
              <div><strong className="text-slate-800">Destination:</strong> {selectedApp.destinationCountry}</div>
              <div><strong className="text-slate-800">Slot:</strong> {selectedApp.date} at {selectedApp.timeSlot} ({selectedApp.appointmentType})</div>
              {selectedApp.additionalInfo && (
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 mt-2">
                  <strong className="text-slate-800">Customer Notes:</strong>
                  <p className="mt-0.5 text-slate-600">{selectedApp.additionalInfo}</p>
                </div>
              )}
            </div>

            {/* Uploaded Files Section */}
            {selectedApp.uploadedFiles && selectedApp.uploadedFiles.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800 mb-1.5">Attached Files ({selectedApp.uploadedFiles.length}):</div>
                <div className="space-y-1">
                  {selectedApp.uploadedFiles.map((file, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <span className="truncate">{file.name} ({file.size} KB)</span>
                      {file.url && (
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1357A6] font-semibold hover:underline flex items-center gap-1"
                        >
                          <span>View</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Staff assignment */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 block mb-1">Assigned Staff Member:</label>
              <input
                type="text"
                placeholder="Enter staff name..."
                value={selectedApp.assignedStaff || ''}
                onChange={(e) => handleAssignStaff(selectedApp.id, e.target.value)}
                className="w-full p-2 text-xs rounded border border-slate-300"
              />
            </div>

            {/* Internal Staff Notes */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold text-slate-800">Internal Audit & Processing Notes:</div>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {(selectedApp.notes || []).map((note, nIdx) => (
                  <div key={nIdx} className="p-2 rounded bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                    {note}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add internal progress note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 p-2 text-xs rounded border border-slate-300"
                />
                <button
                  type="button"
                  onClick={() => handleAddNote(selectedApp.id)}
                  className="px-3 py-2 bg-[#1357A6] text-white text-xs font-bold rounded hover:bg-[#1976D2]"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-2 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded hover:bg-slate-200"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
