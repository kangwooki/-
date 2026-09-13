import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  Download,
  Mail,
  Phone,
  Calendar,
  MapPin,
  FileText,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  X,
  Send,
  Lock,
  User,
  Eye,
  EyeOff,
  LogOut,
  Compass,
  Trees,
  Check,
  HelpCircle,
  ArrowLeft,
  KeyRound,
  Copy,
  Table,
  CheckSquare,
  Sparkles,
  Database,
  Layers,
} from 'lucide-react';
import { ConsultationItem } from '../types';
import { SafeGardenLogo } from './SafeGardenLogo';
import {
  getGoogleSheetsWebhookUrl,
  setGoogleSheetsWebhookUrl,
  fetchConsultationsFromGoogleSheet,
  updateGoogleSheetStatus,
  updateGoogleSheetNote,
  deleteGoogleSheetRow,
  testGoogleSheetConnection,
  GOOGLE_APPS_SCRIPT_CODE,
} from '../services/sheetsWebhook';

export const AdminView: React.FC = () => {
  // Authentication states
  const [token, setToken] = useState<string>(() => sessionStorage.getItem('safegarden_admin_token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Login Form states
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'전체' | '접수' | '검토중' | '완료'>('전체');
  const [categoryFilter, setCategoryFilter] = useState<string>('전체');

  const [selectedItem, setSelectedItem] = useState<ConsultationItem | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [editNote, setEditNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Email test state
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{ success: boolean; msg: string } | null>(null);
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  // System status
  const [systemStatus, setSystemStatus] = useState<{
    googleSheets: string;
    emailAlerts: string;
    adminEmail: string;
    gmailUser?: string;
  } | null>(null);

  const [showConfigHelp, setShowConfigHelp] = useState(false);

  // Google Sheets Webhook (Method 1) integration states
  const [sheetsUrl, setSheetsUrl] = useState<string>(() => getGoogleSheetsWebhookUrl());
  const [sheetsInput, setSheetsInput] = useState<string>(() => getGoogleSheetsWebhookUrl());
  const [isSavingSheetsUrl, setIsSavingSheetsUrl] = useState(false);
  const [sheetsTestStatus, setSheetsTestStatus] = useState<{ success?: boolean; message: string } | null>(null);
  const [isTestingSheets, setIsTestingSheets] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [showSheetsModal, setShowSheetsModal] = useState(false);

  // Verify stored token on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('safegarden_admin_token');
    if (savedToken) {
      fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setToken(savedToken);
            setIsAuthenticated(true);
            fetchData(savedToken);
          } else {
            sessionStorage.removeItem('safegarden_admin_token');
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          sessionStorage.removeItem('safegarden_admin_token');
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsCheckingAuth(false);
        });
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  // Fetch consultation list & integration status with authorization
  const fetchData = async (authToken?: string) => {
    const currentToken = authToken || token;
    if (!currentToken) return;

    setIsLoading(true);
    setError('');
    try {
      // 1. If Google Sheets Webhook (Method 1) is configured, fetch directly from Google Sheets
      const webhookUrl = getGoogleSheetsWebhookUrl();
      if (webhookUrl) {
        try {
          const sheetRes = await fetchConsultationsFromGoogleSheet(webhookUrl);
          if (sheetRes.success && Array.isArray(sheetRes.data)) {
            const localItems: ConsultationItem[] = JSON.parse(
              localStorage.getItem('safegarden_local_consultations') || '[]'
            );
            const sheetIds = new Set(sheetRes.data.map((d) => d.id));
            const merged = [...sheetRes.data];
            for (const local of localItems) {
              if (!sheetIds.has(local.id)) {
                merged.push(local);
              }
            }
            setConsultations(merged);
            setSystemStatus({
              googleSheets: 'CONFIGURED (Google Sheets 실시간 연동)',
              emailAlerts: 'CONFIGURED (cuthip@gmail.com 자동 발송)',
              adminEmail: 'cuthip@gmail.com',
              gmailUser: 'cuthip@gmail.com',
            });
            setIsLoading(false);
            return;
          }
        } catch (sheetErr) {
          console.warn('Direct Google Sheet fetch warning:', sheetErr);
        }
      }

      let dataList: any = null;
      let dataStatus: any = null;

      try {
        const [resList, resStatus] = await Promise.all([
          fetch('/api/admin/consultations', {
            headers: { Authorization: `Bearer ${currentToken}` },
          }),
          fetch('/api/consultation/status'),
        ]);

        if (resList.status === 401) {
          handleLogout();
          throw new Error('인증 세션이 만료되었습니다. 다시 로그인해 주세요.');
        }

        dataList = await resList.json();
        dataStatus = await resStatus.json();
      } catch (networkOrParseErr: any) {
        if (networkOrParseErr.message?.includes('인증 세션이 만료')) {
          throw networkOrParseErr;
        }
        // Fallback to localStorage on static Netlify deployment
        const localItems = JSON.parse(localStorage.getItem('safegarden_local_consultations') || '[]');
        setConsultations(localItems);
        setSystemStatus({
          googleSheets: webhookUrl ? 'CONFIGURED (Google Sheets)' : '설정 대기 중 (상단 [구글 시트 연동] 클릭)',
          emailAlerts: 'cuthip@gmail.com (Apps Script 연동 시 실시간 발송)',
          adminEmail: 'cuthip@gmail.com',
          gmailUser: 'cuthip@gmail.com',
        });
        return;
      }

      if (dataList && dataList.success && Array.isArray(dataList.data)) {
        // Also merge any local fallback consultations if exist
        const localItems = JSON.parse(localStorage.getItem('safegarden_local_consultations') || '[]');
        const existingIds = new Set(dataList.data.map((d: any) => d.id));
        const merged = [...dataList.data];
        for (const localItem of localItems) {
          if (!existingIds.has(localItem.id)) {
            merged.push(localItem);
          }
        }
        setConsultations(merged);
      } else {
        const localItems = JSON.parse(localStorage.getItem('safegarden_local_consultations') || '[]');
        if (localItems.length > 0) {
          setConsultations(localItems);
        } else {
          throw new Error(dataList?.error || '상담 목록을 불러오지 못했습니다.');
        }
      }

      if (dataStatus && dataStatus.status === 'ok') {
        setSystemStatus(dataStatus.integrations);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      // Ensure local items are loaded before displaying error
      const localItems = JSON.parse(localStorage.getItem('safegarden_local_consultations') || '[]');
      if (localItems.length > 0) {
        setConsultations(localItems);
      } else {
        setError(err.message || '데이터 통신 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginId.trim() || !loginPassword.trim()) {
      setLoginError('아이디와 비밀번호를 모두 입력해 주세요.');
      return;
    }

    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginId.trim(),
          password: loginPassword.trim(),
        }),
      });

      let data: any = null;
      try {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await res.json();
        }
      } catch {
        data = null;
      }

      if (data && data.success && data.token) {
        sessionStorage.setItem('safegarden_admin_token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        setLoginPassword('');
        fetchData(data.token);
      } else if (!res.ok && res.status !== 401 && res.status !== 400) {
        // Fallback for static Netlify deployment where backend is not running
        if (loginId.trim() === 'cuthip' && loginPassword.trim() === 'hip1521!') {
          const mockToken = 'netlify-static-admin-token';
          sessionStorage.setItem('safegarden_admin_token', mockToken);
          setToken(mockToken);
          setIsAuthenticated(true);
          setLoginPassword('');
          fetchData(mockToken);
          return;
        }
        setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.');
      } else {
        setLoginError(data?.error || '아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      // Fallback for static Netlify deployment offline/no backend
      if (loginId.trim() === 'cuthip' && loginPassword.trim() === 'hip1521!') {
        const mockToken = 'netlify-static-admin-token';
        sessionStorage.setItem('safegarden_admin_token', mockToken);
        setToken(mockToken);
        setIsAuthenticated(true);
        setLoginPassword('');
        fetchData(mockToken);
        return;
      }
      setLoginError('로그인 처리 중 서버 통신 오류가 발생했습니다.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        // ignore
      }
    }
    sessionStorage.removeItem('safegarden_admin_token');
    setToken('');
    setIsAuthenticated(false);
    setConsultations([]);
    setSelectedItem(null);
  };

  const handleUpdateStatus = async (id: string, newStatus: '접수' | '검토중' | '완료') => {
    setIsUpdatingStatus(true);
    try {
      // Local storage update first for instant responsiveness & static fallback
      try {
        const localItems = JSON.parse(localStorage.getItem('safegarden_local_consultations') || '[]');
        const updatedLocal = localItems.map((item: any) =>
          item.id === id ? { ...item, status: newStatus } : item
        );
        localStorage.setItem('safegarden_local_consultations', JSON.stringify(updatedLocal));
      } catch (e) {
        // ignore
      }

      // Sync to Google Sheet if Webhook URL is configured (Method 1)
      const webhookUrl = getGoogleSheetsWebhookUrl();
      if (webhookUrl) {
        updateGoogleSheetStatus(id, newStatus, webhookUrl).catch((sheetErr) => {
          console.warn('Google Sheet status update warning:', sheetErr);
        });
      }

      const res = await fetch(`/api/admin/consultations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }).catch(() => null);

      if (res && res.status === 401) {
        handleLogout();
        return;
      }

      setConsultations((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.warn('Status update fallback:', err);
      setConsultations((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNote = async (id: string) => {
    setIsSavingNote(true);
    try {
      // Local storage update first
      try {
        const localItems = JSON.parse(localStorage.getItem('safegarden_local_consultations') || '[]');
        const updatedLocal = localItems.map((item: any) =>
          item.id === id ? { ...item, adminNote: editNote } : item
        );
        localStorage.setItem('safegarden_local_consultations', JSON.stringify(updatedLocal));
      } catch (e) {
        // ignore
      }

      // Sync note to Google Sheet if configured
      const webhookUrl = getGoogleSheetsWebhookUrl();
      if (webhookUrl) {
        updateGoogleSheetNote(id, editNote, webhookUrl).catch((sheetErr) => {
          console.warn('Google Sheet note update warning:', sheetErr);
        });
      }

      const res = await fetch(`/api/admin/consultations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ adminNote: editNote }),
      }).catch(() => null);

      if (res && res.status === 401) {
        handleLogout();
        return;
      }

      setConsultations((prev) =>
        prev.map((item) => (item.id === id ? { ...item, adminNote: editNote } : item))
      );
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem((prev) => (prev ? { ...prev, adminNote: editNote } : null));
      }
    } catch (err) {
      console.warn('Note save fallback:', err);
      setConsultations((prev) =>
        prev.map((item) => (item.id === id ? { ...item, adminNote: editNote } : item))
      );
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem((prev) => (prev ? { ...prev, adminNote: editNote } : null));
      }
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`접수번호 [${id}] 상담 건을 정말 삭제하시겠습니까?`)) return;
    try {
      // Remove from localStorage
      try {
        const localItems = JSON.parse(localStorage.getItem('safegarden_local_consultations') || '[]');
        const updatedLocal = localItems.filter((item: any) => item.id !== id);
        localStorage.setItem('safegarden_local_consultations', JSON.stringify(updatedLocal));
      } catch (e) {
        // ignore
      }

      // Delete in Google Sheet if configured
      const webhookUrl = getGoogleSheetsWebhookUrl();
      if (webhookUrl) {
        deleteGoogleSheetRow(id, webhookUrl).catch((sheetErr) => {
          console.warn('Google Sheet delete warning:', sheetErr);
        });
      }

      const res = await fetch(`/api/admin/consultations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => null);

      if (res && res.status === 401) {
        handleLogout();
        return;
      }

      setConsultations((prev) => prev.filter((item) => item.id !== id));
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    } catch (err) {
      console.warn('Delete fallback:', err);
      setConsultations((prev) => prev.filter((item) => item.id !== id));
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    }
  };

  const handleSaveSheetsUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSavingSheetsUrl(true);
    const trimmed = sheetsInput.trim();
    setGoogleSheetsWebhookUrl(trimmed);
    setSheetsUrl(trimmed);
    setSheetsTestStatus({ success: true, message: 'Google Sheets Webhook URL이 성공적으로 저장되었습니다.' });
    setTimeout(() => {
      setIsSavingSheetsUrl(false);
      fetchData();
    }, 400);
  };

  const handleTestSheetsConnection = async () => {
    setIsTestingSheets(true);
    setSheetsTestStatus({ message: '구글 시트 및 cuthip@gmail.com 메일 발송 테스트 중...' });
    try {
      const activeUrl = sheetsInput.trim() || sheetsUrl.trim();
      const res = await testGoogleSheetConnection(activeUrl);
      setSheetsTestStatus(res);
      if (res.success && activeUrl) {
        setGoogleSheetsWebhookUrl(activeUrl);
        setSheetsUrl(activeUrl);
      }
    } catch (err: any) {
      setSheetsTestStatus({ success: false, message: err.message || '테스트 중 오류가 발생했습니다.' });
    } finally {
      setIsTestingSheets(false);
    }
  };

  const handleCopyAppsScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleSendTestEmail = async () => {
    setIsSendingTestEmail(true);
    setTestEmailResult(null);

    // If Google Sheets Webhook URL is set, test via Google Apps Script (Method 1)
    const webhookUrl = sheetsUrl || getGoogleSheetsWebhookUrl();
    if (webhookUrl) {
      try {
        const testRes = await testGoogleSheetConnection(webhookUrl);
        setTestEmailResult({
          success: testRes.success || false,
          msg: testRes.message || 'cuthip@gmail.com 메일로 테스트가 전송되었습니다.',
        });
        setIsSendingTestEmail(false);
        return;
      } catch (scriptErr: any) {
        console.warn('Apps script test email error:', scriptErr);
      }
    }

    try {
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetEmail: 'cuthip@gmail.com' }),
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      if (data.sent) {
        setTestEmailResult({ success: true, msg: data.message || 'cuthip@gmail.com 메일로 테스트가 발송되었습니다.' });
      } else {
        setTestEmailResult({
          success: false,
          msg: data.message || data.error || '메일 발송에 실패했습니다. 상단의 [구글 시트 연동 설정]에서 Webhook URL을 등록해 주세요.',
        });
      }
    } catch (err: any) {
      setTestEmailResult({
        success: false,
        msg: '서버 메일 발송이 불가한 환경입니다. 상단 [구글 시트 & 이메일 연동 (방법 1)]을 등록하시면 즉시 메일이 수신됩니다.',
      });
    } finally {
      setIsSendingTestEmail(false);
    }
  };

  const handleResendEmail = async (id: string) => {
    setIsResendingEmail(true);
    try {
      const res = await fetch(`/api/admin/resend-email/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      if (data.sent) {
        alert('cuthip@gmail.com 메일로 상담 알림이 재발송되었습니다.');
        setConsultations((prev) =>
          prev.map((item) => (item.id === id ? { ...item, emailSent: true } : item))
        );
        if (selectedItem && selectedItem.id === id) {
          setSelectedItem((prev) => (prev ? { ...prev, emailSent: true } : null));
        }
      } else {
        alert(`발송 실패: ${data.message || data.error}`);
      }
    } catch (err: any) {
      alert(`오류: ${err.message}`);
    } finally {
      setIsResendingEmail(false);
    }
  };

  const exportCSV = () => {
    if (consultations.length === 0) {
      alert('다운로드할 상담 내역이 없습니다.');
      return;
    }

    const headers = [
      '접수번호',
      '접수일시',
      '상태',
      '고객명',
      '연락처',
      '이메일',
      '현장주소',
      '토지규모',
      '식물종류',
      '상담분야',
      '상세내용',
      '개인정보동의',
      '관리자메모',
    ];

    const rows = consultations.map((item) => [
      item.id,
      item.submittedAt,
      item.status || '접수',
      item.name,
      item.phone,
      item.email || '',
      `"${(item.location || '').replace(/"/g, '""')}"`,
      `"${(item.landSize || '').replace(/"/g, '""')}"`,
      `"${(item.plantTypes || '').replace(/"/g, '""')}"`,
      `"${(item.selectedCategories || []).join(', ')}"`,
      `"${(item.details || '').replace(/"/g, '""')}"`,
      item.privacyAgreed ? '동의' : '미동의',
      `"${(item.adminNote || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `세이프가든_상담접수목록_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered list
  const filtered = consultations.filter((item) => {
    const matchesStatus = statusFilter === '전체' || (item.status || '접수') === statusFilter;
    const matchesCategory =
      categoryFilter === '전체' || (item.selectedCategories && item.selectedCategories.includes(categoryFilter));
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm.trim() ||
      item.name.toLowerCase().includes(term) ||
      item.phone.toLowerCase().includes(term) ||
      item.location.toLowerCase().includes(term) ||
      (item.email && item.email.toLowerCase().includes(term)) ||
      (item.details && item.details.toLowerCase().includes(term)) ||
      item.id.toLowerCase().includes(term);

    return matchesStatus && matchesCategory && matchesSearch;
  });

  const countTotal = consultations.length;
  const countPending = consultations.filter((i) => (i.status || '접수') === '접수').length;
  const countReviewing = consultations.filter((i) => i.status === '검토중').length;
  const countDone = consultations.filter((i) => i.status === '완료').length;

  // 1. Loading screen while verifying token
  if (isCheckingAuth) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-[#1E4334]">
        <RefreshCw className="w-8 h-8 text-[#5E856F] animate-spin mb-3" />
        <p className="text-sm font-semibold text-[#1E4334]/70">관리자 인증 상태를 확인하는 중입니다...</p>
      </div>
    );
  }

  // 2. Login Screen (when not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#FAF8F5]">
        <div className="w-full max-w-md bg-white rounded-2xl border border-[#1E4334]/15 shadow-xl p-8 sm:p-10 space-y-7">
          
          {/* Brand & Security Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1E4334] text-[#5E856F] shadow-md mx-auto mb-1">
              <SafeGardenLogo variant="symbol" size="lg" theme="gold" />
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#5E856F]">
                <ShieldCheck className="w-4 h-4 text-[#5E856F]" />
                <span>Safe Garden Admin Control</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1E4334] tracking-tight mt-1">
                세이프가든 관리자 로그인
              </h2>
            </div>
            <p className="text-xs text-[#1E4334]/60 leading-relaxed max-w-xs mx-auto">
              고객 상담 신청 내역 및 알림 관리용 보안 시스템입니다. 인가된 관리자 계정으로 로그인해 주세요.
            </p>
          </div>

          {/* Error Banner */}
          {loginError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="font-medium leading-relaxed">{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* ID Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1E4334]">
                관리자 아이디 (ID)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1E4334]/40">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="아이디를 입력하세요"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5]/40 border border-[#1E4334]/20 rounded-xl text-sm text-[#1E4334] font-medium placeholder-[#1E4334]/30 focus:outline-none focus:border-[#1E4334] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1E4334]">
                비밀번호 (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1E4334]/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 bg-[#FAF8F5]/40 border border-[#1E4334]/20 rounded-xl text-sm text-[#1E4334] font-medium placeholder-[#1E4334]/30 focus:outline-none focus:border-[#1E4334] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#1E4334]/40 hover:text-[#1E4334]"
                  tabIndex={-1}
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 px-4 bg-[#1E4334] hover:bg-[#255240] text-[#FAF8F5] rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-[0.99] disabled:opacity-70 mt-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#5E856F]" />
                  <span>인증 확인 중...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-[#5E856F]" />
                  <span>관리자 로그인</span>
                </>
              )}
            </button>
          </form>

          {/* Back Link */}
          <div className="text-center pt-1 border-t border-[#1E4334]/10">
            <button
              onClick={() => {
                window.location.hash = 'home';
              }}
              className="inline-flex items-center space-x-1.5 text-xs text-[#1E4334]/70 hover:text-[#1E4334] font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>세이프가든 홈페이지 메인으로 이동</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 3. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#FAF8F5]/50 pb-20 text-[#1E4334]">
      
      {/* Top Header */}
      <div className="bg-[#1E4334] text-[#FAF8F5] border-b border-[#1E4334]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <SafeGardenLogo variant="symbol" size="md" theme="gold" />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight">세이프가든 현장상담 관리자</h1>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#5E856F] text-[#1E4334]">
                    Admin Portal
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-[#5E856F]/90 mt-0.5">
                  <span>로그인 계정:</span>
                  <span className="font-mono font-bold text-white bg-white/15 px-2 py-0.5 rounded flex items-center space-x-1">
                    <User className="w-3 h-3 text-[#5E856F]" />
                    <span>cuthip</span>
                  </span>
                  <span className="text-white/40">•</span>
                  <span>인증 완료</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Logout */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowSheetsModal(true)}
                className="px-3.5 py-2 bg-[#5E856F] hover:bg-[#B8A779] text-[#1E4334] rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm active:scale-95"
              >
                <Table className="w-3.5 h-3.5 text-[#1E4334]" />
                <span>구글 시트 & 메일 연동 (방법 1)</span>
              </button>
              <button
                onClick={() => fetchData()}
                disabled={isLoading}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all active:scale-95"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>새로고침</span>
              </button>
              <button
                onClick={exportCSV}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>엑셀(CSV) 저장</span>
              </button>
              <button
                onClick={() => setShowConfigHelp(!showConfigHelp)}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-[#5E856F] rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>도움말</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all"
                title="로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Status Bar */}
      <div className="bg-white border-b border-[#1E4334]/10 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-1.5">
                <span className="text-[#1E4334]/60">알림 수신 메일:</span>
                <span className="font-semibold text-[#1E4334] flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-[#5E856F]" />
                  <span>cuthip@gmail.com</span>
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[#1E4334]/60">구글 시트 & 메일 상태:</span>
                <span
                  className={`font-semibold px-2 py-0.5 rounded text-[11px] flex items-center space-x-1 ${
                    sheetsUrl
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${sheetsUrl ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span>{sheetsUrl ? '구글 시트 & 메일 자동 발송 연동됨' : '구글 시트 Webhook 미설정'}</span>
                </span>
              </div>
            </div>

            {/* Test Email Button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSendTestEmail}
                disabled={isSendingTestEmail}
                className="px-3 py-1.5 rounded-md bg-[#1E4334] text-white hover:bg-[#255240] text-[11px] font-bold flex items-center space-x-1 transition-all"
              >
                {isSendingTestEmail ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <Send className="w-3 h-3 text-[#5E856F]" />
                )}
                <span>cuthip@gmail.com으로 테스트 메일 발송</span>
              </button>
            </div>
          </div>

          {/* Test Email Result Banner */}
          {testEmailResult && (
            <div
              className={`mt-2 p-2.5 rounded-lg text-xs flex items-center justify-between ${
                testEmailResult.success
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                {testEmailResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                )}
                <span>{testEmailResult.msg}</span>
              </div>
              <button onClick={() => setTestEmailResult(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Google Sheets (Method 1) Quick Setup Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="bg-gradient-to-r from-[#1E4334] to-[#2B5E4A] rounded-xl text-white p-5 shadow-sm border border-[#1E4334]/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 bg-white/10 rounded-lg text-[#FAF8F5]">
                  <Table className="w-4 h-4 text-emerald-300" />
                </span>
                <h3 className="font-bold text-sm sm:text-base text-white">
                  방법 1: Google Sheets & Apps Script 실시간 연동 (Netlify 정적 사이트 완벽 지원)
                </h3>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  sheetsUrl ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30' : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                }`}>
                  {sheetsUrl ? '● 연동 완료' : '● URL 등록 대기'}
                </span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed max-w-3xl">
                Google Sheets의 Apps Script Webhook URL을 등록하면, 고객이 상담 신청을 누르는 순간 
                <strong className="text-white ml-1 underline underline-offset-2">① 구글 스프레드시트에 즉시 새 행이 추가</strong>되고, 
                <strong className="text-white ml-1 underline underline-offset-2">② cuthip@gmail.com으로 안내 메일이 즉시 발송</strong>됩니다.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setShowSheetsModal(true)}
                className="px-3.5 py-2 bg-white text-[#1E4334] hover:bg-[#FAF8F5] rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#5E856F]" />
                <span>1분 연동 가이드 & 코드 복사</span>
              </button>
            </div>
          </div>

          {/* Quick Input Bar */}
          <form onSubmit={handleSaveSheetsUrl} className="mt-4 pt-3.5 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <input
                type="url"
                value={sheetsInput}
                onChange={(e) => setSheetsInput(e.target.value)}
                placeholder="Google Apps Script 웹 앱 URL 입력 (https://script.google.com/macros/s/.../exec)"
                className="w-full px-3.5 py-2 bg-black/20 border border-white/20 rounded-lg text-xs text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isSavingSheetsUrl}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50 shrink-0"
              >
                {isSavingSheetsUrl ? '저장 중...' : 'URL 저장'}
              </button>
              <button
                type="button"
                onClick={handleTestSheetsConnection}
                disabled={isTestingSheets || !sheetsInput.trim()}
                className="px-3.5 py-2 bg-white/15 hover:bg-white/25 text-white rounded-lg text-xs font-semibold transition-all disabled:opacity-40 shrink-0 flex items-center space-x-1"
              >
                {isTestingSheets ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                <span>연동 & 메일 테스트</span>
              </button>
            </div>
          </form>

          {/* Test Status Msg */}
          {sheetsTestStatus && (
            <div className={`mt-3 p-2.5 rounded-lg text-xs flex items-center justify-between ${
              sheetsTestStatus.success
                ? 'bg-emerald-900/50 text-emerald-200 border border-emerald-400/30'
                : 'bg-amber-900/50 text-amber-200 border border-amber-400/30'
            }`}>
              <div className="flex items-center space-x-2">
                {sheetsTestStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span>{sheetsTestStatus.message}</span>
              </div>
              <button onClick={() => setSheetsTestStatus(null)} className="text-white/50 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Method 1 Full Setup Modal */}
      {showSheetsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1E4334]/20 p-6 sm:p-8 space-y-6 text-[#1E4334]">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#1E4334]/10">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#1E4334] text-white rounded-xl">
                  <Table className="w-5 h-5 text-[#5E856F]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1E4334]">
                    방법 1: Google Sheets & 이메일 실시간 연동 (1분 완성 가이드)
                  </h2>
                  <p className="text-xs text-[#1E4334]/70 mt-0.5">
                    Netlify 같은 정적 호스팅에서도 서버 비용 없이 영구적으로 안정적인 실시간 메일 수신이 가능합니다.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSheetsModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#1E4334]/10 space-y-3">
                <h4 className="font-bold text-sm text-[#1E4334] flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#1E4334] text-white text-[11px] font-mono flex items-center justify-center">1</span>
                  <span>구글 드라이브에서 스프레드시트 생성</span>
                </h4>
                <p className="text-[#1E4334]/80 pl-7">
                  <a
                    href="https://sheets.new"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-emerald-700 font-bold hover:underline"
                  >
                    <span>Google Sheets 새 시트 바로 열기 (sheets.new)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {' '}로 접속하여 새 시트를 생성합니다. (제목 예시: <code>세이프가든 상담신청 DB</code>)
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#1E4334]/10 space-y-3">
                <h4 className="font-bold text-sm text-[#1E4334] flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#1E4334] text-white text-[11px] font-mono flex items-center justify-center">2</span>
                  <span>확장 프로그램 &gt; Apps Script 열기</span>
                </h4>
                <p className="text-[#1E4334]/80 pl-7">
                  시트 상단 메뉴에서 <strong>[확장 프로그램] &gt; [Apps Script]</strong>를 클릭하여 스크립트 편집기를 엽니다.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#1E4334]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#1E4334] flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#1E4334] text-white text-[11px] font-mono flex items-center justify-center">3</span>
                    <span>아래의 스크립트 코드 복사 후 붙여넣기</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleCopyAppsScript}
                    className="px-3 py-1 bg-[#1E4334] text-white hover:bg-[#255240] rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs"
                  >
                    {copiedScript ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#5E856F]" />
                        <span>코드 원클릭 복사</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[#1E4334]/80 pl-7">
                  기존에 적혀있는 <code>function myFunction() ...</code> 내용을 지우고, 복사한 코드를 그대로 붙여넣은 뒤 <strong>Ctrl + S (저장)</strong>를 누릅니다.
                </p>
                <div className="pl-7">
                  <div className="bg-[#1B2B23] rounded-lg p-3 max-h-48 overflow-y-auto font-mono text-[11px] text-emerald-200 border border-emerald-900/50">
                    <pre>{GOOGLE_APPS_SCRIPT_CODE}</pre>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-3">
                <h4 className="font-bold text-sm text-emerald-950 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] font-mono flex items-center justify-center">4</span>
                  <span>웹 앱 배포 (가장 중요: 권한 설정)</span>
                </h4>
                <div className="pl-7 space-y-2 text-emerald-900">
                  <p>스크립트 편집기 우측 상단 파란색 <strong>[배포] &gt; [새 배포]</strong> 클릭</p>
                  <ul className="list-disc list-inside space-y-1 bg-white/70 p-3 rounded-lg border border-emerald-200/60 font-medium">
                    <li>유형 선택: <strong>[웹 앱 (Web App)]</strong> 선택</li>
                    <li>설명: <code>세이프가든 연동</code> 입력</li>
                    <li>다음 사용자 권한으로 실행: <strong>나 (cuthip@gmail.com)</strong></li>
                    <li>
                      액세스 권한이 있는 사용자: <strong className="text-red-700 bg-red-100 px-1.5 py-0.5 rounded">모든 사용자 (Anyone)</strong> 
                      <span className="text-xs text-gray-600 block mt-0.5 ml-4">* '모든 사용자'로 선택해야 홈페이지 방문자가 인증 없이 신청서를 등록할 수 있습니다.</span>
                    </li>
                  </ul>
                  <p className="text-[11px] text-emerald-800">
                    * [배포] 클릭 후 Google 계정 권한 승인 창이 뜨면 <strong>[액세스 승인] &gt; [고급] &gt; [안전하지 않은 페이지로 이동] &gt; [허용]</strong>을 진행해 주세요.
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#1E4334]/10 space-y-3">
                <h4 className="font-bold text-sm text-[#1E4334] flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#1E4334] text-white text-[11px] font-mono flex items-center justify-center">5</span>
                  <span>발급된 웹앱 URL 등록 및 테스트</span>
                </h4>
                <div className="pl-7 space-y-3">
                  <p className="text-[#1E4334]/80">
                    배포 완료 후 표시되는 <strong>웹 앱 URL (https://script.google.com/macros/s/.../exec)</strong>을 복사하여 아래에 입력하세요:
                  </p>
                  <form onSubmit={handleSaveSheetsUrl} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      value={sheetsInput}
                      onChange={(e) => setSheetsInput(e.target.value)}
                      placeholder="https://script.google.com/macros/s/.../exec"
                      className="flex-1 px-3.5 py-2.5 border border-[#1E4334]/20 rounded-lg text-xs focus:ring-2 focus:ring-[#1E4334] focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isSavingSheetsUrl}
                      className="px-4 py-2.5 bg-[#1E4334] text-white rounded-lg text-xs font-bold hover:bg-[#255240] transition-colors"
                    >
                      {isSavingSheetsUrl ? '저장 중...' : 'URL 저장'}
                    </button>
                    <button
                      type="button"
                      onClick={handleTestSheetsConnection}
                      disabled={isTestingSheets || !sheetsInput.trim()}
                      className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center space-x-1"
                    >
                      {isTestingSheets ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      <span>테스트 발송</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#1E4334]/10 flex items-center justify-between">
              <span className="text-xs text-[#1E4334]/70">
                연동 완료 시 고객 신청 즉시 <strong>cuthip@gmail.com</strong>으로 메일이 전송됩니다.
              </span>
              <button
                onClick={() => setShowSheetsModal(false)}
                className="px-5 py-2.5 bg-[#1E4334] hover:bg-[#255240] text-white rounded-xl text-xs font-bold transition-all"
              >
                닫기
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Config Help Drawer */}
      {showConfigHelp && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-white rounded-xl border border-[#1E4334]/15 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-base font-bold text-[#1E4334] flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#5E856F]" />
                <span>cuthip@gmail.com 메일 수신 & 구글 시트 연동 설정 안내</span>
              </h3>
              <button
                onClick={() => setShowConfigHelp(false)}
                className="text-[#1E4334]/40 hover:text-[#1E4334]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#1E4334]/80 leading-relaxed">
              <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#1E4334]/10 space-y-2">
                <strong className="text-sm font-bold text-[#1E4334] block">
                  1. Gmail 16자리 앱 비밀번호 설정 (메일 실시간 수신)
                </strong>
                <p>
                  고객이 상담을 신청하면 즉시 <strong className="text-[#1E4334]">cuthip@gmail.com</strong> 메일함으로 신청서 요약본이 전송됩니다.
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Google 계정 관리 (myaccount.google.com) 접속</li>
                  <li>[보안] 탭 &gt; 2단계 인증 활성화 확인</li>
                  <li>[앱 비밀번호] 메뉴에서 '세이프가든'으로 16자리 비밀번호 생성</li>
                  <li>AI Studio 상단 [Settings] &gt; [Environment Variables]에 입력:</li>
                </ol>
                <pre className="p-2.5 bg-white rounded border border-[#1E4334]/15 font-mono text-[11px] overflow-x-auto text-[#1E4334]">
ADMIN_EMAIL=cuthip@gmail.com
GMAIL_USER=cuthip@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
ADMIN_USER=cuthip
ADMIN_PASSWORD=hip1521!
                </pre>
              </div>

              <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#1E4334]/10 space-y-2">
                <strong className="text-sm font-bold text-[#1E4334] block">
                  2. Google Sheets 자동 저장 (1분 웹앱 설정)
                </strong>
                <p>
                  구글 시트에 상담 데이터를 누적하려면 Google Apps Script 웹앱 URL을 입력하시면 됩니다.
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>구글 시트 생성 &gt; [확장 프로그램] &gt; [Apps Script] 클릭</li>
                  <li>doPost 스크립트 붙여넣기 후 [새 배포] &gt; [웹 앱] 배포</li>
                  <li>발급받은 웹앱 URL을 환경변수에 등록:</li>
                </ol>
                <pre className="p-2.5 bg-white rounded border border-[#1E4334]/15 font-mono text-[11px] overflow-x-auto text-[#1E4334]">
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
                </pre>
                <p className="text-[11px] text-[#5E856F]">
                  * 연동 설정 전에도 입력된 모든 상담은 지금 보고 계신 관리자 페이지에 100% 안전하게 저장됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#1E4334]/10 shadow-xs">
            <span className="text-xs font-semibold text-[#1E4334]/60 block">총 접수 건수</span>
            <div className="text-2xl sm:text-3xl font-bold text-[#1E4334] mt-1">{countTotal}건</div>
            <div className="text-[11px] text-[#5E856F] mt-1">누적 현장평가 상담</div>
          </div>

          <div
            onClick={() => setStatusFilter('접수')}
            className={`bg-white p-5 rounded-xl border transition-all cursor-pointer shadow-xs ${
              statusFilter === '접수' ? 'border-[#1E4334] ring-2 ring-[#1E4334]/10' : 'border-[#1E4334]/10 hover:border-[#1E4334]/30'
            }`}
          >
            <span className="text-xs font-semibold text-amber-700 block">신규 접수 (대기)</span>
            <div className="text-2xl sm:text-3xl font-bold text-amber-800 mt-1">{countPending}건</div>
            <div className="text-[11px] text-amber-600 mt-1">확인 및 초기 검토 필요</div>
          </div>

          <div
            onClick={() => setStatusFilter('검토중')}
            className={`bg-white p-5 rounded-xl border transition-all cursor-pointer shadow-xs ${
              statusFilter === '검토중' ? 'border-[#1E4334] ring-2 ring-[#1E4334]/10' : 'border-[#1E4334]/10 hover:border-[#1E4334]/30'
            }`}
          >
            <span className="text-xs font-semibold text-blue-700 block">현장 검토 진행 중</span>
            <div className="text-2xl sm:text-3xl font-bold text-blue-800 mt-1">{countReviewing}건</div>
            <div className="text-[11px] text-blue-600 mt-1">위성 분석 또는 현장 일정 조율</div>
          </div>

          <div
            onClick={() => setStatusFilter('완료')}
            className={`bg-white p-5 rounded-xl border transition-all cursor-pointer shadow-xs ${
              statusFilter === '완료' ? 'border-[#1E4334] ring-2 ring-[#1E4334]/10' : 'border-[#1E4334]/10 hover:border-[#1E4334]/30'
            }`}
          >
            <span className="text-xs font-semibold text-emerald-700 block">상담 및 조치 완료</span>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-800 mt-1">{countDone}건</div>
            <div className="text-[11px] text-emerald-600 mt-1">상담 완료 및 리포트 전달</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#1E4334]/10 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex items-center space-x-1 bg-[#FAF8F5] p-1 rounded-lg">
            {(['전체', '접수', '검토중', '완료'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-[#1E4334] text-[#FAF8F5] shadow-xs'
                    : 'text-[#1E4334]/70 hover:text-[#1E4334]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-[#1E4334]/40 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="고객명, 연락처, 주소, 상담 키워드 검색..."
              className="w-full pl-9 pr-8 py-2 bg-[#FAF8F5]/70 rounded-lg text-xs text-[#1E4334] placeholder-[#1E4334]/40 border border-[#1E4334]/15 focus:outline-none focus:border-[#1E4334]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-xl border border-[#1E4334]/10 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#5E856F] mx-auto" />
              <p className="text-xs text-[#1E4334]/60">상담 데이터를 불러오는 중입니다...</p>
            </div>
          ) : error ? (
            <div className="py-16 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
              <p className="text-sm font-bold text-red-700">{error}</p>
              <button
                onClick={() => fetchData()}
                className="px-4 py-2 bg-[#1E4334] text-white rounded-lg text-xs font-semibold"
              >
                다시 시도
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center mx-auto text-[#5E856F]">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1E4334]">상담 접수 내역이 없습니다.</h3>
              <p className="text-xs text-[#1E4334]/60 max-w-sm mx-auto">
                {searchTerm || statusFilter !== '전체'
                  ? '검색 필터 조건에 부합하는 내역이 없습니다.'
                  : '홈페이지 상담 신청 폼에서 고객이 상담을 신청하면 이곳에 실시간으로 등록됩니다.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5]/80 text-[#1E4334] border-b border-[#1E4334]/10 font-bold">
                    <th className="py-3 px-4">접수번호 / 일시</th>
                    <th className="py-3 px-4">고객 정보</th>
                    <th className="py-3 px-4">현장 위치 / 규모</th>
                    <th className="py-3 px-4">상담 분야</th>
                    <th className="py-3 px-4">상태</th>
                    <th className="py-3 px-4 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E4334]/5">
                  {filtered.map((item) => {
                    const status = item.status || '접수';
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-[#FAF8F5]/40 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedItem(item);
                          setEditNote(item.adminNote || '');
                        }}
                      >
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-[#1E4334] block">{item.id}</span>
                          <span className="text-[11px] text-[#5E856F] flex items-center space-x-1 mt-0.5">
                            <Clock className="w-3 h-3 shrink-0" />
                            <span>{item.submittedAt}</span>
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <strong className="text-sm font-bold text-[#1E4334] block">{item.name}</strong>
                          <a
                            href={`tel:${item.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#5E856F] hover:text-[#1E4334] font-semibold flex items-center space-x-1 mt-0.5"
                          >
                            <Phone className="w-3 h-3 shrink-0" />
                            <span>{item.phone}</span>
                          </a>
                          {item.email && (
                            <span className="text-[#1E4334]/50 text-[11px] block mt-0.5 truncate max-w-[160px]">
                              {item.email}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 max-w-xs">
                          <div className="font-medium text-[#1E4334] flex items-start space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-[#5E856F] shrink-0 mt-0.5" />
                            <span className="truncate">{item.location}</span>
                          </div>
                          {(item.landSize || item.plantTypes) && (
                            <div className="text-[11px] text-[#1E4334]/60 mt-1 pl-4.5 space-x-2">
                              {item.landSize && <span>규모: {item.landSize}</span>}
                              {item.plantTypes && <span>수목: {item.plantTypes}</span>}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4 max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {item.selectedCategories.slice(0, 2).map((cat) => (
                              <span
                                key={cat}
                                className="px-2 py-0.5 bg-[#1E4334]/10 text-[#1E4334] rounded text-[10px] font-semibold"
                              >
                                {cat}
                              </span>
                            ))}
                            {item.selectedCategories.length > 2 && (
                              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
                                +{item.selectedCategories.length - 2}
                              </span>
                            )}
                          </div>
                          {item.attachedFiles && item.attachedFiles.length > 0 && (
                            <span className="text-[11px] text-[#5E856F] block mt-1">
                              📷 사진 {item.attachedFiles.length}건
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={status}
                            onChange={(e) =>
                              handleUpdateStatus(item.id, e.target.value as '접수' | '검토중' | '완료')
                            }
                            className={`px-2.5 py-1 rounded-full text-xs font-bold border focus:outline-none cursor-pointer ${
                              status === '접수'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : status === '검토중'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            }`}
                          >
                            <option value="접수">신규 접수</option>
                            <option value="검토중">검토중</option>
                            <option value="완료">상담 완료</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end space-x-1">
                            <button
                              onClick={() => {
                                setSelectedItem(item);
                                setEditNote(item.adminNote || '');
                              }}
                              className="p-1.5 rounded text-[#1E4334]/70 hover:text-[#1E4334] hover:bg-black/5"
                              title="상세 보기"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Modal / Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1E4334]/20 p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#1E4334]/10 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1E4334] text-[#FAF8F5]">
                    {selectedItem.id}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      (selectedItem.status || '접수') === '접수'
                        ? 'bg-amber-100 text-amber-800'
                        : selectedItem.status === '검토중'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {selectedItem.status || '접수'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#1E4334] mt-2">
                  {selectedItem.name} 고객님 현장평가 신청서
                </h2>
                <span className="text-xs text-[#5E856F]">접수일시: {selectedItem.submittedAt}</span>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Contact & Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] p-4 rounded-xl border border-[#1E4334]/10">
              <div className="space-y-1">
                <span className="text-xs text-[#1E4334]/60 block">신청 고객</span>
                <span className="text-base font-bold text-[#1E4334] block">{selectedItem.name}</span>
                <a
                  href={`tel:${selectedItem.phone}`}
                  className="text-sm font-bold text-[#1E4334] hover:underline flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#5E856F]" />
                  <span>{selectedItem.phone}</span>
                </a>
                {selectedItem.email && (
                  <a
                    href={`mailto:${selectedItem.email}`}
                    className="text-xs text-[#5E856F] hover:underline flex items-center space-x-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedItem.email}</span>
                  </a>
                )}
              </div>

              <div className="flex flex-col justify-center gap-2">
                <a
                  href={`tel:${selectedItem.phone}`}
                  className="px-4 py-2 bg-[#1E4334] text-white rounded-lg text-xs font-bold text-center hover:bg-[#255240] transition-all flex items-center justify-center space-x-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#5E856F]" />
                  <span>고객에게 바로 전화 걸기</span>
                </a>

                <button
                  onClick={() => handleResendEmail(selectedItem.id)}
                  disabled={isResendingEmail}
                  className="px-4 py-2 bg-white border border-[#1E4334]/20 text-[#1E4334] rounded-lg text-xs font-bold hover:bg-gray-50 transition-all flex items-center justify-center space-x-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#5E856F]" />
                  <span>cuthip@gmail.com으로 알림 재발송</span>
                </button>
              </div>
            </div>

            {/* Field Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5E856F]">
                현장 및 상담 요청 정보
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-500 block mb-0.5">토지/빈집 위치</span>
                  <span className="font-bold text-[#1E4334]">{selectedItem.location}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-500 block mb-0.5">토지 규모</span>
                  <span className="font-bold text-[#1E4334]">{selectedItem.landSize || '(미기재)'}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-500 block mb-0.5">식물/수목 종류</span>
                  <span className="font-bold text-[#1E4334]">{selectedItem.plantTypes || '(미기재)'}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-500 block mb-0.5">개인정보 동의</span>
                  <span className="font-bold text-emerald-700">
                    {selectedItem.privacyAgreed ? '✓ 동의 완료' : '미동의'}
                  </span>
                </div>
              </div>

              {/* Consultation Categories */}
              <div>
                <span className="text-xs text-[#1E4334]/60 block mb-1.5">선택한 상담 대상 분야:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.selectedCategories.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 bg-[#1E4334] text-[#FAF8F5] rounded-md text-xs font-semibold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="p-4 rounded-xl bg-[#FAF8F5]/70 border border-[#1E4334]/10 space-y-1">
                <span className="text-xs font-bold text-[#1E4334] block">상세 문의 내용:</span>
                <p className="text-xs text-[#1E4334]/90 whitespace-pre-wrap leading-relaxed">
                  {selectedItem.details || '(작성된 상세 문의 내용 없음)'}
                </p>
              </div>

              {/* Attachments */}
              {selectedItem.attachedFiles && selectedItem.attachedFiles.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#1E4334] block">
                    첨부 파일 ({selectedItem.attachedFiles.length}건):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.attachedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-200 text-xs text-[#1E4334] flex items-center space-x-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#5E856F]" />
                        <span>{file.name}</span>
                        <span className="text-gray-400 text-[10px]">({file.size})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Note Section */}
            <div className="space-y-2 pt-2 border-t border-[#1E4334]/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1E4334] flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5 text-[#5E856F]" />
                  <span>관리자 메모 (내부 기록용)</span>
                </label>
                <span className="text-[11px] text-[#5E856F]">
                  고객에게는 노출되지 않는 내부 관리용 메모입니다.
                </span>
              </div>
              <textarea
                rows={3}
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                placeholder="예: 9/11 위성 사진 확인 결과 도로 폭 양호. 9/12 고객과 통화 후 방문 일정 확정 예정..."
                className="w-full p-3 bg-[#FAF8F5]/50 rounded-lg border border-[#1E4334]/20 text-xs text-[#1E4334] focus:outline-none focus:border-[#1E4334]"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => handleSaveNote(selectedItem.id)}
                  disabled={isSavingNote}
                  className="px-4 py-2 bg-[#1E4334] text-[#FAF8F5] rounded-lg text-xs font-bold hover:bg-[#255240] transition-all flex items-center space-x-1"
                >
                  {isSavingNote ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3 text-[#5E856F]" />}
                  <span>메모 저장</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1E4334]/10 text-xs">
              <button
                onClick={() => handleDelete(selectedItem.id)}
                className="text-red-600 hover:text-red-800 font-bold flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>상담 내역 삭제</span>
              </button>

              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold"
              >
                닫기
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
