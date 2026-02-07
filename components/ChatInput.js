"use client";
"use client";

import { useState, useRef, useEffect } from "react";
import VoiceInput from "./VoiceInput";
import { detectSensitiveContent, getSensitiveContentWarning, validateMessage } from "@/backend/services/contentValidator";
import { validateImageFile, fileToBase64 } from "@/backend/services/imageAnalyzer";

export default function ChatInput({ onSend, disabled, onSendImage }) {
  const [text, setText] = useState("");
  const [sensitiveWarning, setSensitiveWarning] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [imageDescription, setImageDescription] = useState("");
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setImageError(validation.error);
      setSelectedImage(null);
      setImagePreview(null);
      return;
    }

    setSelectedImage(file);
    setImageError(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setImageDescription("");
    setImageError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedImage || !onSendImage) return;

    try {
      const base64Image = await fileToBase64(selectedImage);
      onSendImage(base64Image, imageDescription);
      handleRemoveImage();
      setText("");
    } catch (error) {
      console.error("Error processing image:", error);
      setImageError("Failed to process image. Please try again.");
    }
  };
        {/* Image Upload Error */}
        {imageError && (
          <div
            className="mb-3 p-3 rounded-lg text-xs"
            style={{
              background: 'var(--error-light)',
              color: 'var(--error)',
              border: '1px solid var(--error)'
            }}
          >
            {imageError}
          </div>
        )}

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-3 p-4 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-xs max-h-48 rounded-lg object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
                  <strong>Describe what's in this image:</strong>
                </p>
                <textarea
                  value={imageDescription}
                  onChange={(e) => setImageDescription(e.target.value)}
                  placeholder="e.g., broken glass, messy room, stormy weather..."
                  className="w-full p-2 rounded text-sm resize-none"
                  rows={3}
                  style={{
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)'
                  }}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={handleImageSubmit}
                    className="px-4 py-2 rounded text-sm font-medium"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white'
                    }}
                  >
                    Send Image
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-4 py-2 rounded text-sm"
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  // Check for sensitive content as user types
  useEffect(() => {
    if (text.trim().length > 10) {
      const detection = detectSensitiveContent(text);
      if (detection.isSensitive) {
        setSensitiveWarning(getSensitiveContentWarning(detection.category));
      } else {
        setSensitiveWarning(null);
      }
    } else {
      setSensitiveWarning(null);
    }
  }, [text]);

  // Handle voice transcription
  const handleVoiceTranscript = (transcript) => {
    setText(prev => (prev ? prev + " " : "") + transcript);
    
    // Auto-validate when voice is transcribed
    const validation = validateMessage((text ? text + " " : "") + transcript);
    if (!validation.isValid) {
      setInputError(validation.error);
    } else {
      setInputError(null);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validate message
    const validation = validateMessage(text);
    if (!validation.isValid) {
      setInputError(validation.error);
      return;
    }

    // Check for sensitive content
    const detection = detectSensitiveContent(text);
    if (detection.isSensitive) {
      // Show warning but still allow sending
      console.warn('Sensitive content detected:', detection.category);
    }

    if (!text.trim() || disabled) return;
    
    onSend(text);
    setText("");
    setSensitiveWarning(null);
    setInputError(null);
  }

  return (
    <div className="input-container p-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Sensitive Content Warning */}
        {sensitiveWarning && (
          <div
            className="mb-3 p-3 rounded-lg text-xs whitespace-pre-wrap"
            style={{
              background: 'var(--warning-light)',
              color: 'var(--text-primary)',
              border: '1px solid var(--warning)',
              maxHeight: '150px',
              overflowY: 'auto'
            }}
          >
            {sensitiveWarning}
          </div>
        )}

        {/* Input Error */}
        {inputError && (
          <div
            className="mb-3 p-3 rounded-lg text-xs"
            style={{
              background: 'var(--error-light)',
              color: 'var(--error)',
              border: '1px solid var(--error)'
            }}
          >
            {inputError}
          </div>
        )}

        {/* Voice Input Component */}
        <div className="mb-3">
          <VoiceInput 
            onTranscript={handleVoiceTranscript}
            disabled={disabled}
          />
        </div>

        {/* Text Input Form */}
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1 relative">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageSelect}
              className="hidden"
            />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={disabled || !!selectedImage}
                        className="image-button w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                        title="Upload image"
                        style={{
                          background: disabled || selectedImage ? 'var(--text-muted)' : 'var(--bg-secondary)',
                          border: '1px solid var(--border)',
                          cursor: disabled || selectedImage ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                      </button>
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setInputError(null);
              }}
              placeholder="Type or use voice input... 🎤"
              disabled={disabled}
              rows={1}
              className="input-field w-full px-4 py-3 rounded-2xl resize-none"
              style={{ 
                minHeight: '48px', 
                maxHeight: '120px',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                borderColor: inputError ? 'var(--error)' : 'var(--border)'
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            {/* Character count */}
            <span
              className="absolute bottom-2 right-2 text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              {text.length}/2000
            </span>
          </div>
          <button
            type="submit"
            disabled={disabled || !text.trim()}
            className="send-button w-12 h-12 rounded-xl flex-shrink-0"
            style={{
              background: disabled || !text.trim() 
                ? 'var(--text-muted)' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              cursor: disabled || !text.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            {disabled ? (
              <div className="loading-spinner animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>

        {/* Helper Text */}
        <div className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          Press Shift+Enter for new line • Sensitive topics are monitored for your safety
        </div>
      </div>
    </div>
  );
}