import { Moon, Sun } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { useTheme } from '@workspace/ui/hooks/use-theme';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='cursor-pointer dark:bg-card'>
          <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='bg-card'>
        <DropdownMenuItem onClick={() => setTheme('light')} className='cursor-pointer'>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className='cursor-pointer'>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className='cursor-pointer'>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
