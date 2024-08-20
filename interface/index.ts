// export enum RoleEnum {}

// User registration
export interface VerifyOTP {
  mobile: string;
  otp: string;
}

// User login
// ~~
export interface OTP {
  mobile: string;
}

// User
// ~~
export interface UserIF {
  _id: string;
  name: string;
  // email: string;
  mobile: string;
  password: string;
  role: string;
  otp: string | undefined;
  otpExpires: number | undefined;
  isVerified: boolean;
  chatRoomAccess: ChatRoomAccessIF[];
}

export interface ChatRoomAccessIF {
  chatRoom: ChatRoomIF;
  isBanned: boolean;
  isFinished: boolean;
}

export interface ChatRoomIF {
  _id: string;
  title: string;
  createdBy: UserIF;
  status: "acknowledged" | "pending" | "solved" | "unsolved";
  chats: { chat: ChatIF }[];
  createdAt: Date;
}

export interface ChatIF {
  sentByUser: UserIF;
  chatRoom: ChatRoomIF;
  message: string;
  createdAt: Date;
}
