import React, { useState, useEffect } from 'react';
import { ModeSelector } from '@/components/ui/mode-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { BottomSheet, BottomSheetTrigger, BottomSheetContent, BottomSheetHeader, BottomSheetTitle, BottomSheetDescription, BottomSheetFooter, BottomSheetClose } from '@/components/ui/bottom-sheet';
import { useTheme, Palette } from '@/components/theme-provider';
import { Moon, Sun, Monitor } from 'lucide-react';

const PlaygroundPage: React.FC = () => {
  const [uiMode, setUiMode] = useState<'popup' | 'sidepanel'>('sidepanel');
  const { theme, setTheme, palette, setPalette } = useTheme();

  useEffect(() => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get({ uiMode: 'sidepanel' }, (res) => {
        setUiMode(res.uiMode as 'popup' | 'sidepanel');
      });
    }
  }, []);

  function updateMode(next: 'popup' | 'sidepanel') {
    setUiMode(next);
    if (chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ type: 'SET_UIMODE', value: next });
    }
  }

  return (
    <div
      style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}
      className="space-y-8 pb-20"
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Design System Playground</h1>
        <p className="text-muted-foreground">
          Welcome to the Clorio Wallet component playground. Here you can test all available UI components and themes.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Theme & Mode Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Theme & Mode</h2>
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Manage application appearance and behavior.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>UI Mode</Label>
                <ModeSelector mode={uiMode} onChange={updateMode} />
              </div>
              
              <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="flex gap-2">
                  <Button variant={theme === 'light' ? 'default' : 'outline'} size="icon" onClick={() => setTheme('light')}>
                    <Sun className="h-4 w-4" />
                  </Button>
                  <Button variant={theme === 'dark' ? 'default' : 'outline'} size="icon" onClick={() => setTheme('dark')}>
                    <Moon className="h-4 w-4" />
                  </Button>
                  <Button variant={theme === 'system' ? 'default' : 'outline'} size="icon" onClick={() => setTheme('system')}>
                    <Monitor className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Color Palette</Label>
                <div className="flex flex-wrap gap-2">
                  {(['default', 'green', 'violet', 'orange'] as Palette[]).map((p) => (
                    <Button 
                      key={p} 
                      variant={palette === p ? 'default' : 'outline'} 
                      onClick={() => setPalette(p)}
                      className="capitalize"
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Buttons Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Buttons</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="lg">Large</Button>
                <Button size="default">Default</Button>
                <Button size="sm">Small</Button>
                <Button size="icon"><Sun className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inputs Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Inputs</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="Password" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="error-input" className="text-destructive">Error State</Label>
                <Input type="text" id="error-input" placeholder="Invalid input" error />
                <p className="text-sm text-destructive">This field has an error.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tabs Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Tabs</h2>
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account</CardTitle>
                      <CardDescription>
                        Make changes to your account here. Click save when you're done.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Pedro Duarte" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="@peduarte" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Change your password here. After saving, you'll be logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="current">Current password</Label>
                        <Input id="current" type="password" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="new">New password</Label>
                        <Input id="new" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save password</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Overlays Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Overlays</h2>
          <Card>
            <CardContent className="pt-6 flex gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <BottomSheet>
                <BottomSheetTrigger asChild>
                  <Button variant="outline">Open Bottom Sheet</Button>
                </BottomSheetTrigger>
                <BottomSheetContent>
                  <BottomSheetHeader>
                    <BottomSheetTitle>Are you absolutely sure?</BottomSheetTitle>
                    <BottomSheetDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </BottomSheetDescription>
                  </BottomSheetHeader>
                  <BottomSheetFooter>
                    <Button>Submit</Button>
                    <BottomSheetClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </BottomSheetClose>
                  </BottomSheetFooter>
                </BottomSheetContent>
              </BottomSheet>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default PlaygroundPage;
