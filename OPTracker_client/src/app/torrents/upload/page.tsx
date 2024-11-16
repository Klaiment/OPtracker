'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TorrentUploadPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    visibility: 'public'
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    console.log('File:', file);
  };

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">
          {t('torrents.upload.title')}
        </h1>

        <form onSubmit={handleSubmit} className="bg-surface p-6 rounded border border-border">
          <div className="mb-6">
            <label className="block text-text mb-2">
              {t('torrents.upload.form.torrentFile')}
            </label>
            <div 
              className="border-2 border-dashed border-border rounded p-8 text-center
                         hover:border-primary transition-colors cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file?.name.endsWith('.torrent')) {
                  setFile(file);
                }
              }}
            >
              {file ? (
                <span className="text-primary">{file.name}</span>
              ) : (
                <>
                  <p>{t('torrents.upload.dropzone.text')}</p>
                  <p className="text-text-secondary text-sm mt-2">
                    {t('torrents.upload.dropzone.accepted')}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-text mb-2">
                {t('torrents.upload.form.name')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 bg-background border border-border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-text mb-2">
                {t('torrents.upload.form.description')}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 bg-background border border-border rounded h-32"
                required
              />
            </div>

            <div>
              <label className="block text-text mb-2">
                {t('torrents.upload.form.category')}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2 bg-background border border-border rounded"
                required
              >
                <option value="">Select category</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
                <option value="applications">Applications</option>
                <option value="games">Games</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-background py-3 rounded 
                         hover:bg-primary-dark transition-colors font-medium"
            >
              {t('torrents.upload.form.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 