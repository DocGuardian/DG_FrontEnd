import { HttpResponse } from "../models/httpRes.model";
import { User } from "../models/user.model";

export function formatUser(res: HttpResponse) {
    let userRes = res.data.response;
    const user: User = {
      id: userRes.id,
      first_name: userRes.first_name,
      last_name: userRes.last_name,
      email: userRes.email,
      password: userRes.password,
      phone: userRes.phone,
      imageUrl: userRes.imageUrl,
      isEnabled: userRes.isEnabled,
      isLocked: userRes.isLocked,
      role: userRes.role,
      enable_tfa: userRes.enable_tfa,
      createdAt: userRes.createdAt,
      updatedAt: userRes.updatedAt,
    };
    return user;
  }