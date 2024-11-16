/**
 * Torrent Upload Page
 * Handles torrent upload and submission
 * Includes form for torrent details and file dropzones for torrent and NFO files
 */

'use client';

import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface FileDropzoneProps {
  file: File | null;
  setFile: (file: File | null) => void;
  accept: string;
  dropzoneText: string;
  acceptedText: string;
}

function FileDropzone({ file, setFile, accept, dropzoneText, acceptedText }: FileDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.name.endsWith(accept)) {
      setFile(droppedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className="border-2 border-dashed border-border rounded p-8 text-center
                 hover:border-primary transition-colors cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setFile(file);
        }}
      />
      {file ? (
        <span className="text-primary">{file.name}</span>
      ) : (
        <>
          <p>{dropzoneText}</p>
          <p className="text-text-secondary text-sm mt-2">
            {acceptedText}
          </p>
        </>
      )}
    </div>
  );
}

export default function TorrentUploadPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    visibility: 'public'
  });
  const [torrentFile, setTorrentFile] = useState<File | null>(null);
  const [nfoFile, setNfoFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    console.log('Torrent file:', torrentFile);
    console.log('NFO file:', nfoFile);
  };

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">
          {t('torrents.upload.title')}
        </h1>

        <form onSubmit={handleSubmit} className="bg-surface p-6 rounded border border-border">
          <div className="space-y-6">
            {/* Torrent File Dropzone */}
            <div>
              <label className="block text-text mb-2">
                {t('torrents.upload.form.torrentFile')}
              </label>
              <FileDropzone
                file={torrentFile}
                setFile={setTorrentFile}
                accept=".torrent"
                dropzoneText={t('torrents.upload.dropzone.text')}
                acceptedText={t('torrents.upload.dropzone.accepted')}
              />
            </div>

            {/* NFO File Dropzone */}
            <div>
              <label className="block text-text mb-2">
                {t('torrents.upload.form.nfoFile')}
              </label>
              <FileDropzone
                file={nfoFile}
                setFile={setNfoFile}
                accept=".nfo"
                dropzoneText={t('torrents.upload.dropzone.nfoText')}
                acceptedText={t('torrents.upload.dropzone.nfoAccepted')}
              />
            </div>

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