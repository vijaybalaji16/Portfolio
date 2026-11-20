import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  Download,
  FileText,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import type {
  DocumentFormat,
  EducationItem,
  PortfolioData,
  ProductProject,
  ProjectCategory,
  WorkExperience,
} from '../types/portfolio';
import { PRESET_IMAGES } from '../data/defaultPortfolio';

interface PortfolioEditorDrawerProps {
  isOpen: boolean;
  portfolio: PortfolioData;
  onClose: () => void;
  onSave: (updated: PortfolioData) => Promise<void>;
  onReset: () => Promise<void>;
}

type EditorTab = 'profile' | 'experience' | 'projects' | 'education';

const INPUT_CLASS =
  'w-full px-3 py-2 text-sm text-[#FAFAFA] placeholder:text-[#52525B] bg-[#060608] border border-white/[0.12] rounded-lg focus:outline-none focus:border-[#F2C97D]';

export function PortfolioEditorDrawer({
  isOpen,
  portfolio,
  onClose,
  onSave,
  onReset,
}: PortfolioEditorDrawerProps) {
  const [draft, setDraft] = useState<PortfolioData>(portfolio);
  const [activeTab, setActiveTab] = useState<EditorTab>('profile');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setDraft(structuredClone(portfolio));
      setSaveMessage('');
    }
  }, [isOpen, portfolio]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage('');
    try {
      await onSave(draft);
      setSaveMessage('Published live to your shareable URL');
    } catch {
      setSaveMessage('Saved locally (server unavailable)');
    } finally {
      setSaving(false);
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${draft.profile.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as PortfolioData;
        if (parsed?.profile?.name) {
          setDraft(parsed);
          setSaveMessage('Imported JSON — click Save & Publish to apply');
        }
      } catch {
        setSaveMessage('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: 'New Company',
      role: 'Senior Product Manager',
      period: '2024 — Present',
      location: 'Remote',
      summary: 'Led product strategy and cross-functional execution.',
      highlights: ['Shipped core feature driving measurable activation lift.'],
    };
    setDraft((prev) => ({ ...prev, experiences: [newExp, ...prev.experiences] }));
  };

  const handleProjectDocUpload = async (
    idx: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = String(reader.result);
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, base64 }),
        });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          setSaveMessage(data.error || 'Document upload failed');
          return;
        }
        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        const format: DocumentFormat =
          ext === 'pdf'
            ? 'PDF'
            : ext === 'ppt' || ext === 'pptx'
            ? 'PPTX'
            : 'DOCX';
        setDraft((prev) => {
          const next = [...prev.projects];
          next[idx] = {
            ...next[idx],
            documentUrl: data.url,
            documentName: file.name,
            documentFormat: format,
          };
          return { ...prev, projects: next };
        });
        setSaveMessage(`Attached ${file.name} — click Save & Publish`);
      } catch {
        setSaveMessage('Unable to upload document');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const addProject = () => {
    const newProj: ProductProject = {
      id: `proj-${Date.now()}`,
      title: 'New Product Case Study',
      subtitle: 'Zero-to-one launch or platform scaling initiative',
      category: '0-to-1 Launch',
      year: String(new Date().getFullYear()),
      role: 'Lead Product Manager',
      company: draft.experiences[0]?.company || 'Organization',
      headlineMetric: '+25% Key Metric Lift',
      imageUrl: PRESET_IMAGES.fintech,
      documentFormat: 'Google Doc',
      summary: 'Concise overview of the customer problem and business outcome.',
      problem: 'Describe the core customer friction and market gap.',
      strategy: 'Explain the strategic bet and key prioritization trade-offs.',
      execution: 'Detail how engineering, design, and GTM partnered to ship.',
      outcomes: ['Quantified business impact with timeframe'],
      artifacts: ['Product Strategy Memo', 'Experiment Plan'],
    };
    setDraft((prev) => ({ ...prev, projects: [newProj, ...prev.projects] }));
  };

  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: 'University Name',
      degree: 'Degree & Concentration',
      period: '2018 — 2020',
      location: 'City, State',
      details: 'Honors, leadership, or relevant coursework.',
    };
    setDraft((prev) => ({ ...prev, education: [newEdu, ...prev.education] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Customize Portfolio Details"
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[740px] h-full bg-[#0C0C0E] border-l border-[#27272A] flex flex-col shadow-2xl text-[#F4F4F5]"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-[#121215] border-b border-[#27272A] flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-medium text-[#F4F4F5]">
                  Customize Portfolio
                </h2>
                <p className="text-xs text-[#A1A1AA]">
                  Update your details and publish to your shareable URL.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close editor"
                className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#27272A] text-[#F4F4F5] hover:bg-[#1E1E22] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Section Tabs */}
            <div className="px-6 py-3 bg-[#0C0C0E] border-b border-[#27272A] flex items-center gap-1 overflow-x-auto">
              {(
                [
                  { id: 'profile', label: 'Profile & Contact' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'projects', label: 'Case Studies' },
                  { id: 'education', label: 'Education & Skills' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#F4F4F5] text-[#050505]'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#18181B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'profile' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={draft.profile.name}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, name: e.target.value },
                          })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                        Role / Title
                      </label>
                      <input
                        type="text"
                        value={draft.profile.role}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, role: e.target.value },
                          })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={draft.profile.location}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, location: e.target.value },
                          })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                        Availability Status
                      </label>
                      <input
                        type="text"
                        value={draft.profile.availability}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, availability: e.target.value },
                          })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                      Hero Headline
                    </label>
                    <input
                      type="text"
                      value={draft.profile.headline}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          profile: { ...draft.profile, headline: e.target.value },
                        })
                      }
                      className={INPUT_CLASS}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                      Executive Summary / Subheadline
                    </label>
                    <textarea
                      rows={3}
                      value={draft.profile.subheadline}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          profile: { ...draft.profile, subheadline: e.target.value },
                        })
                      }
                      className={INPUT_CLASS}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                      Portrait Image URL (leave blank for initials monogram)
                    </label>
                    <input
                      type="text"
                      value={draft.profile.portraitUrl}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          profile: { ...draft.profile, portraitUrl: e.target.value },
                        })
                      }
                      className={INPUT_CLASS}
                    />
                  </div>

                  <div className="pt-4 border-t border-[#222226] grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={draft.profile.email}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, email: e.target.value },
                          })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={draft.profile.phone}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, phone: e.target.value },
                          })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={draft.profile.linkedinUrl}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, linkedinUrl: e.target.value },
                          })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                        GitHub / Writing URL
                      </label>
                      <input
                        type="url"
                        value={draft.profile.githubUrl}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, githubUrl: e.target.value },
                          })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="pt-4 border-t border-[#222226]">
                    <h3 className="text-xs font-mono text-[#A1A1AA] mb-3">
                      Key Career Impact Strip (4 Metrics)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {draft.metrics.map((m, i) => (
                        <div
                          key={m.id}
                          className="p-3 rounded-xl bg-[#121215] border border-[#27272A] space-y-2"
                        >
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={m.value}
                              placeholder="Value"
                              onChange={(e) => {
                                const next = [...draft.metrics];
                                next[i] = { ...m, value: e.target.value };
                                setDraft({ ...draft, metrics: next });
                              }}
                              className="px-2.5 py-1.5 text-xs font-mono text-[#F4F4F5] bg-[#050505] border border-[#27272A] rounded-md"
                            />
                            <input
                              type="text"
                              value={m.label}
                              placeholder="Label"
                              onChange={(e) => {
                                const next = [...draft.metrics];
                                next[i] = { ...m, label: e.target.value };
                                setDraft({ ...draft, metrics: next });
                              }}
                              className="px-2.5 py-1.5 text-xs text-[#F4F4F5] bg-[#050505] border border-[#27272A] rounded-md"
                            />
                          </div>
                          <input
                            type="text"
                            value={m.context}
                            placeholder="Context"
                            onChange={(e) => {
                              const next = [...draft.metrics];
                              next[i] = { ...m, context: e.target.value };
                              setDraft({ ...draft, metrics: next });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs text-[#F4F4F5] bg-[#050505] border border-[#27272A] rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-medium text-[#F4F4F5]">
                      Work Experience Entries
                    </h3>
                    <button
                      type="button"
                      onClick={addExperience}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#060608] bg-[#FAFAFA] hover:bg-[#F2C97D] rounded-lg transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Role</span>
                    </button>
                  </div>

                  {draft.experiences.map((exp, idx) => (
                    <div
                      key={exp.id}
                      className="p-5 rounded-xl bg-[#121215] border border-[#27272A] space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-[#A1A1AA]">
                          Role #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setDraft({
                              ...draft,
                              experiences: draft.experiences.filter((e) => e.id !== exp.id),
                            })
                          }
                          className="inline-flex items-center gap-1 text-xs text-red-400 hover:underline"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.company}
                          placeholder="Company"
                          onChange={(e) => {
                            const next = [...draft.experiences];
                            next[idx] = { ...exp, company: e.target.value };
                            setDraft({ ...draft, experiences: next });
                          }}
                          className={INPUT_CLASS}
                        />
                        <input
                          type="text"
                          value={exp.role}
                          placeholder="Role Title"
                          onChange={(e) => {
                            const next = [...draft.experiences];
                            next[idx] = { ...exp, role: e.target.value };
                            setDraft({ ...draft, experiences: next });
                          }}
                          className={INPUT_CLASS}
                        />
                        <input
                          type="text"
                          value={exp.period}
                          placeholder="Period (e.g. 2023 — Present)"
                          onChange={(e) => {
                            const next = [...draft.experiences];
                            next[idx] = { ...exp, period: e.target.value };
                            setDraft({ ...draft, experiences: next });
                          }}
                          className={INPUT_CLASS}
                        />
                        <input
                          type="text"
                          value={exp.location}
                          placeholder="Location"
                          onChange={(e) => {
                            const next = [...draft.experiences];
                            next[idx] = { ...exp, location: e.target.value };
                            setDraft({ ...draft, experiences: next });
                          }}
                          className={INPUT_CLASS}
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={exp.summary}
                        placeholder="Role scope & team summary"
                        onChange={(e) => {
                          const next = [...draft.experiences];
                          next[idx] = { ...exp, summary: e.target.value };
                          setDraft({ ...draft, experiences: next });
                        }}
                        className={INPUT_CLASS}
                      />

                      <div>
                        <label className="block text-xs text-[#A1A1AA] mb-1">
                          Quantified Highlights (one per line)
                        </label>
                        <textarea
                          rows={3}
                          value={exp.highlights.join('\n')}
                          onChange={(e) => {
                            const next = [...draft.experiences];
                            next[idx] = {
                              ...exp,
                              highlights: e.target.value
                                .split('\n')
                                .filter((line) => line.trim() !== ''),
                            };
                            setDraft({ ...draft, experiences: next });
                          }}
                          className="w-full px-3 py-2 text-xs leading-relaxed text-[#F4F4F5] bg-[#050505] border border-[#27272A] rounded-lg focus:outline-none focus:border-[#3B82F6]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-medium text-[#F4F4F5]">
                      Product Case Studies
                    </h3>
                    <button
                      type="button"
                      onClick={addProject}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#060608] bg-[#FAFAFA] hover:bg-[#F2C97D] rounded-lg transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Case Study</span>
                    </button>
                  </div>

                  {draft.projects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className="p-5 rounded-xl bg-[#121215] border border-[#27272A] space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-[#A1A1AA]">
                          Case Study #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setDraft({
                              ...draft,
                              projects: draft.projects.filter((p) => p.id !== proj.id),
                            })
                          }
                          className="inline-flex items-center gap-1 text-xs text-red-400 hover:underline"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={proj.title}
                          placeholder="Project Title"
                          onChange={(e) => {
                            const next = [...draft.projects];
                            next[idx] = { ...proj, title: e.target.value };
                            setDraft({ ...draft, projects: next });
                          }}
                          className={INPUT_CLASS}
                        />
                        <input
                          type="text"
                          value={proj.headlineMetric}
                          placeholder="Headline Outcome Metric"
                          onChange={(e) => {
                            const next = [...draft.projects];
                            next[idx] = { ...proj, headlineMetric: e.target.value };
                            setDraft({ ...draft, projects: next });
                          }}
                          className={INPUT_CLASS}
                        />
                        <select
                          value={proj.category}
                          onChange={(e) => {
                            const next = [...draft.projects];
                            next[idx] = {
                              ...proj,
                              category: e.target.value as ProjectCategory,
                            };
                            setDraft({ ...draft, projects: next });
                          }}
                          className={INPUT_CLASS}
                        >
                          <option value="0-to-1 Launch">0-to-1 Launch</option>
                          <option value="Platform & Scale">Platform & Scale</option>
                          <option value="Growth">Growth</option>
                        </select>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={proj.company}
                            placeholder="Company"
                            onChange={(e) => {
                              const next = [...draft.projects];
                              next[idx] = { ...proj, company: e.target.value };
                              setDraft({ ...draft, projects: next });
                            }}
                            className={INPUT_CLASS}
                          />
                          <input
                            type="text"
                            value={proj.year}
                            placeholder="Year"
                            onChange={(e) => {
                              const next = [...draft.projects];
                              next[idx] = { ...proj, year: e.target.value };
                              setDraft({ ...draft, projects: next });
                            }}
                            className={INPUT_CLASS}
                          />
                        </div>
                        <input
                          type="text"
                          value={proj.projectType || ''}
                          placeholder="Project Kind (e.g. PRD, Case Study, Deck)"
                          onChange={(e) => {
                            const next = [...draft.projects];
                            next[idx] = { ...proj, projectType: e.target.value };
                            setDraft({ ...draft, projects: next });
                          }}
                          className={INPUT_CLASS}
                        />
                        <input
                          type="text"
                          value={proj.benefit || ''}
                          placeholder="Thumbnail Benefit (e.g. Increasing User Engagement)"
                          onChange={(e) => {
                            const next = [...draft.projects];
                            next[idx] = { ...proj, benefit: e.target.value };
                            setDraft({ ...draft, projects: next });
                          }}
                          className={INPUT_CLASS}
                        />
                      </div>

                      {/* Attached Google Docs / Slides Link or Uploaded File */}
                      <div className="p-3 rounded-lg bg-[#050505] border border-[#27272A] space-y-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs text-[#A3A3B0]">
                            <FileText className="w-3.5 h-3.5 text-[#F2C97D]" />
                            <span>
                              {proj.documentName ||
                                (proj.documentUrl
                                  ? 'Google Doc / External Link attached'
                                  : 'Paste Google Docs link below or upload a file')}
                            </span>
                          </span>
                          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#060608] bg-[#FAFAFA] hover:bg-[#F2C97D] rounded-md cursor-pointer transition-colors">
                            <Upload className="w-3 h-3" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept=".doc,.docx,.ppt,.pptx,.pdf"
                              onChange={(e) => handleProjectDocUpload(idx, e)}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <select
                            value={proj.documentFormat || 'Google Doc'}
                            onChange={(e) => {
                              const next = [...draft.projects];
                              next[idx] = {
                                ...proj,
                                documentFormat: e.target.value as DocumentFormat,
                              };
                              setDraft({ ...draft, projects: next });
                            }}
                            className="px-2.5 py-1.5 text-xs text-[#F4F4F5] bg-[#121215] border border-[#27272A] rounded-md"
                          >
                            <option value="Google Doc">Google Doc</option>
                            <option value="Google Slides">Google Slides</option>
                            <option value="DOCX">DOCX</option>
                            <option value="PPTX">PPTX</option>
                            <option value="PDF">PDF</option>
                          </select>
                          <input
                            type="url"
                            value={proj.documentUrl || ''}
                            placeholder="Paste Google Docs / Slides link (https://docs.google.com/...)"
                            onChange={(e) => {
                              const val = e.target.value;
                              const next = [...draft.projects];
                              const detectedFormat: DocumentFormat | undefined =
                                val.includes('docs.google.com/document')
                                  ? 'Google Doc'
                                  : val.includes('docs.google.com/presentation')
                                  ? 'Google Slides'
                                  : proj.documentFormat;
                              next[idx] = {
                                ...proj,
                                documentUrl: val,
                                documentFormat: detectedFormat,
                                documentName: val.includes('docs.google.com')
                                  ? `${proj.title || 'Project'} (${detectedFormat})`
                                  : proj.documentName,
                              };
                              setDraft({ ...draft, projects: next });
                            }}
                            className="sm:col-span-2 px-2.5 py-1.5 text-xs text-[#F4F4F5] bg-[#121215] border border-[#27272A] rounded-md"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                          <select
                            value={proj.imageUrl}
                            onChange={(e) => {
                              const next = [...draft.projects];
                              next[idx] = { ...proj, imageUrl: e.target.value };
                              setDraft({ ...draft, projects: next });
                            }}
                            className="px-2.5 py-1.5 text-xs text-[#F4F4F5] bg-[#121215] border border-[#27272A] rounded-md"
                          >
                            <option value={PRESET_IMAGES.creedomPrd}>Creedom Recommendation Cover</option>
                            <option value={PRESET_IMAGES.fintech}>Enterprise / Ops Cover</option>
                            <option value={PRESET_IMAGES.workflow}>Workflow / Platform Cover</option>
                            <option value={PRESET_IMAGES.consumer}>Consumer / Growth Cover</option>
                          </select>
                          <input
                            type="text"
                            value={proj.imageUrl}
                            placeholder="Thumbnail image URL"
                            onChange={(e) => {
                              const next = [...draft.projects];
                              next[idx] = { ...proj, imageUrl: e.target.value };
                              setDraft({ ...draft, projects: next });
                            }}
                            className="sm:col-span-2 px-2.5 py-1.5 text-xs text-[#F4F4F5] bg-[#121215] border border-[#27272A] rounded-md"
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        value={proj.subtitle}
                        placeholder="Subtitle"
                        onChange={(e) => {
                          const next = [...draft.projects];
                          next[idx] = { ...proj, subtitle: e.target.value };
                          setDraft({ ...draft, projects: next });
                        }}
                        className={INPUT_CLASS}
                      />

                      <textarea
                        rows={2}
                        value={proj.summary}
                        placeholder="Card summary"
                        onChange={(e) => {
                          const next = [...draft.projects];
                          next[idx] = { ...proj, summary: e.target.value };
                          setDraft({ ...draft, projects: next });
                        }}
                        className={INPUT_CLASS}
                      />

                      <textarea
                        rows={2}
                        value={proj.problem}
                        placeholder="01. Problem & Context"
                        onChange={(e) => {
                          const next = [...draft.projects];
                          next[idx] = { ...proj, problem: e.target.value };
                          setDraft({ ...draft, projects: next });
                        }}
                        className="w-full px-3 py-2 text-xs text-[#F4F4F5] bg-[#050505] border border-[#27272A] rounded-lg"
                      />

                      <textarea
                        rows={2}
                        value={proj.strategy}
                        placeholder="02. Strategic Bet"
                        onChange={(e) => {
                          const next = [...draft.projects];
                          next[idx] = { ...proj, strategy: e.target.value };
                          setDraft({ ...draft, projects: next });
                        }}
                        className="w-full px-3 py-2 text-xs text-[#F4F4F5] bg-[#050505] border border-[#27272A] rounded-lg"
                      />

                      <textarea
                        rows={2}
                        value={proj.execution}
                        placeholder="03. Execution & Trade-offs"
                        onChange={(e) => {
                          const next = [...draft.projects];
                          next[idx] = { ...proj, execution: e.target.value };
                          setDraft({ ...draft, projects: next });
                        }}
                        className="w-full px-3 py-2 text-xs text-[#F4F4F5] bg-[#050505] border border-[#27272A] rounded-lg"
                      />

                      <div>
                        <label className="block text-xs text-[#A1A1AA] mb-1">
                          Outcomes (one per line)
                        </label>
                        <textarea
                          rows={2}
                          value={proj.outcomes.join('\n')}
                          onChange={(e) => {
                            const next = [...draft.projects];
                            next[idx] = {
                              ...proj,
                              outcomes: e.target.value
                                .split('\n')
                                .filter((l) => l.trim() !== ''),
                            };
                            setDraft({ ...draft, projects: next });
                          }}
                          className="w-full px-3 py-2 text-xs text-[#F4F4F5] bg-[#050505] border border-[#27272A] rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-medium text-[#F4F4F5]">
                        Education
                      </h3>
                      <button
                        type="button"
                        onClick={addEducation}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#060608] bg-[#FAFAFA] hover:bg-[#F2C97D] rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Degree</span>
                      </button>
                    </div>

                    {draft.education.map((edu, idx) => (
                      <div
                        key={edu.id}
                        className="p-4 rounded-xl bg-[#121215] border border-[#27272A] space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-[#A1A1AA]">
                            Credential #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setDraft({
                                ...draft,
                                education: draft.education.filter((e) => e.id !== edu.id),
                              })
                            }
                            className="inline-flex items-center gap-1 text-xs text-red-400 hover:underline"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={edu.degree}
                            placeholder="Degree"
                            onChange={(e) => {
                              const next = [...draft.education];
                              next[idx] = { ...edu, degree: e.target.value };
                              setDraft({ ...draft, education: next });
                            }}
                            className={INPUT_CLASS}
                          />
                          <input
                            type="text"
                            value={edu.institution}
                            placeholder="Institution"
                            onChange={(e) => {
                              const next = [...draft.education];
                              next[idx] = { ...edu, institution: e.target.value };
                              setDraft({ ...draft, education: next });
                            }}
                            className={INPUT_CLASS}
                          />
                          <input
                            type="text"
                            value={edu.period}
                            placeholder="Years"
                            onChange={(e) => {
                              const next = [...draft.education];
                              next[idx] = { ...edu, period: e.target.value };
                              setDraft({ ...draft, education: next });
                            }}
                            className={INPUT_CLASS}
                          />
                          <input
                            type="text"
                            value={edu.location}
                            placeholder="Location"
                            onChange={(e) => {
                              const next = [...draft.education];
                              next[idx] = { ...edu, location: e.target.value };
                              setDraft({ ...draft, education: next });
                            }}
                            className={INPUT_CLASS}
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={edu.details}
                          placeholder="Honors, thesis, or focus"
                          onChange={(e) => {
                            const next = [...draft.education];
                            next[idx] = { ...edu, details: e.target.value };
                            setDraft({ ...draft, education: next });
                          }}
                          className="w-full px-3 py-2 text-xs text-[#F4F4F5] bg-[#050505] border border-[#27272A] rounded-lg"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#222226] space-y-3">
                    <h3 className="font-display text-lg font-medium text-[#F4F4F5]">
                      Product Philosophy Note
                    </h3>
                    <input
                      type="text"
                      value={draft.profile.philosophyTitle}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          profile: { ...draft.profile, philosophyTitle: e.target.value },
                        })
                      }
                      className={INPUT_CLASS}
                    />
                    <textarea
                      rows={3}
                      value={draft.profile.philosophyBody}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          profile: { ...draft.profile, philosophyBody: e.target.value },
                        })
                      }
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Footer Actions */}
            <div className="px-6 py-4 bg-[#121215] border-t border-[#27272A] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json"
                  onChange={handleImportJson}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#A1A1AA] hover:text-[#F4F4F5] border border-[#27272A] rounded-lg"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#A1A1AA] hover:text-[#F4F4F5] border border-[#27272A] rounded-lg"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await onReset();
                    setSaveMessage('Restored sample portfolio');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#A1A1AA] hover:text-red-400 border border-[#27272A] rounded-lg"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="flex items-center gap-3 ml-auto">
                {saveMessage && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#F2C97D]">
                    <Check className="w-3.5 h-3.5" />
                    <span>{saveMessage}</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2.5 text-sm font-medium text-[#060608] bg-[#FAFAFA] hover:bg-[#F2C97D] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  {saving ? 'Publishing...' : 'Save & Publish'}
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
