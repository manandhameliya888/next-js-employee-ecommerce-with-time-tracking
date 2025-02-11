// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";

// export default function SettingsPage() {

//   return (
//     <div className="p-8">
//       <div className="grid gap-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Profile Settings</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label>Full Name</Label>
//               <Input defaultValue="Darshan Bhikadiya" />
//             </div>
//             <div className="space-y-2">
//               <Label>Email</Label>
//               <Input defaultValue="darshanbhikadiya@example.com" type="email" />
//             </div>
//             <Button>Update Profile</Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Notifications</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <Label>Email Notifications</Label>
//               <Switch defaultChecked />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label>Clock In/Out Reminders</Label>
//               <Switch defaultChecked />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label>Points Updates</Label>
//               <Switch />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Password</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label>Current Password</Label>
//               <Input type="password" />
//             </div>
//             <div className="space-y-2">
//               <Label>New Password</Label>
//               <Input type="password" />
//             </div>
//             <div className="space-y-2">
//               <Label>Confirm New Password</Label>
//               <Input type="password" />
//             </div>
//             <Button>Change Password</Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState, useRef } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";

// export default function SettingsPage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [fullName, setFullName] = useState("Darshan Bhikadiya");
//   const [email, setEmail] = useState("darshanbhikadiya@example.com");
//   const fullNameRef = useRef<HTMLInputElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null);

//   const handleUpdateClick = () => {
//     setIsEditing(true);
//     fullNameRef.current?.focus()
//   };

//   const handleSaveChanges = () => {
//     setIsEditing(false);
//     console.log("Updated Full Name:", fullName);
//     console.log("Updated Email:", email);
//   };

//   return (
//     <div className="p-8">
//       <div className="grid gap-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Profile Settings</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label>Full Name</Label>
//               <Input
//                 ref={fullNameRef}
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Email</Label>
//               <Input
//                 ref={emailRef}
//                 value={email}
//                 type="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 onFocus={() => emailRef.current?.focus()}
//               />
//             </div>
//             <Button onClick={isEditing ? handleSaveChanges : handleUpdateClick}>
//               {isEditing ? "Save Changes" : "Update Profile"}
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Notifications</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <Label>Email Notifications</Label>
//               <Switch defaultChecked />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label>Clock In/Out Reminders</Label>
//               <Switch defaultChecked />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label>Points Updates</Label>
//               <Switch />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Password</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label>Current Password</Label>
//               <Input type="password" />
//             </div>
//             <div className="space-y-2">
//               <Label>New Password</Label>
//               <Input type="password" />
//             </div>
//             <div className="space-y-2">
//               <Label>Confirm New Password</Label>
//               <Input type="password" />
//             </div>
//             <Button>Change Password</Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState, useRef } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";

// export default function SettingsPage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [fullName, setFullName] = useState("Darshan Bhikadiya");
//   const [email, setEmail] = useState("darshanbhikadiya@example.com");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
  
//   const fullNameRef = useRef<HTMLInputElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null);
//   const currentPasswordRef = useRef<HTMLInputElement>(null);
//   const newPasswordRef = useRef<HTMLInputElement>(null);
//   const confirmPasswordRef = useRef<HTMLInputElement>(null);

//   const handleUpdateClick = () => {
//     setIsEditing(true);
//     fullNameRef.current?.focus();
//   };

//   const handleSaveChanges = () => {
//     setIsEditing(false);
//     console.log("Updated Full Name:", fullName);
//     console.log("Updated Email:", email);
//   };

//   return (
//     <div className="p-8">
//       <div className="grid gap-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Profile Settings</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label>Full Name</Label>
//               <Input
//                 ref={fullNameRef}
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Email</Label>
//               <Input
//                 ref={emailRef}
//                 value={email}
//                 type="email"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <Button onClick={isEditing ? handleSaveChanges : handleUpdateClick}>
//               {isEditing ? "Save Changes" : "Update Profile"}
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Notifications</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <Label>Email Notifications</Label>
//               <Switch defaultChecked />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label>Clock In/Out Reminders</Label>
//               <Switch defaultChecked />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label>Points Updates</Label>
//               <Switch />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Password</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label>Current Password</Label>
//               <Input ref={currentPasswordRef} type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
//             </div>
//             <div className="space-y-2">
//               <Label>New Password</Label>
//               <Input ref={newPasswordRef} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//             </div>
//             <div className="space-y-2">
//               <Label>Confirm New Password</Label>
//               <Input ref={confirmPasswordRef} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//             </div>
//             <Button>Change Password</Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }




"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [fullName, setFullName] = useState("Darshan Bhikadiya");
  const [email, setEmail] = useState("darshanbhikadiya@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleUpdateClick = () => {
    setIsEditing(true);
    fullNameRef.current?.focus();
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    console.log("Updated Full Name:", fullName);
    console.log("Updated Email:", email);
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    currentPasswordRef.current?.focus();
  };

  const handleSavePassword = () => {
    setIsChangingPassword(false);
    console.log("Password Updated:", { currentPassword, newPassword, confirmPassword });
  };

  return (
    <div className="p-8">
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                ref={fullNameRef}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                ref={emailRef}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={isEditing ? handleSaveChanges : handleUpdateClick}>
              {isEditing ? "Save Changes" : "Update Profile"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Clock In/Out Reminders</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Points Updates</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input ref={currentPasswordRef} type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input ref={newPasswordRef} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input ref={confirmPasswordRef} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <Button onClick={isChangingPassword ? handleSavePassword : handleChangePasswordClick}>
              {isChangingPassword ? "Save Changes" : "Change Password"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
