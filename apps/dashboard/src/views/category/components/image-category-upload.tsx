import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@workspace/ui/components/button';
import { toast } from '@workspace/ui/components/sonner';

import { Camera, Tags } from 'lucide-react';

interface ImageUploadProps {
  defaultValue?: string | null;
  onChange?: (file: File | null) => void;
}

const MAX_SIZE = 5 * 1024 * 1024;

export function ImageUpload({ defaultValue = null, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        toast.error('File is too big (max 5MB)');
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      if (onChange) onChange(file);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const defaultImage = 'https://ik.imagekit.io/dianerdiana/saas-food-menu/stores/default-store.png?tr:ar-4-4,w-160';

  useEffect(() => {
    setPreview(defaultValue);
  }, [defaultValue]);

  return (
    <div className='w-fit'>
      <div className='relative inline-block'>
        <input type='file' className='hidden' ref={fileInputRef} accept='image/*' onChange={handleImageChange} />

        <div className='size-40 overflow-hidden bg-primary/20 rounded-full flex items-center justify-center border-2 border-muted'>
          {preview ? (
            <img
              src={preview || defaultImage}
              alt='store-preview'
              className='w-full h-full object-center object-cover'
            />
          ) : (
            <Tags className='stroke-primary size-20' />
          )}
        </div>

        <Button
          type='button'
          className='absolute -bottom-2 right-4 rounded-full shadow-lg'
          size={'icon'}
          variant={'primary'}
          onClick={onButtonClick}
        >
          <Camera size={20} />
        </Button>
      </div>
    </div>
  );
}
