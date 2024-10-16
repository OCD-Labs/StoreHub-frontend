"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BASE_URL } from "@constants";

import { setCookie } from "@lib/cookie";
import { setUser } from "@lib/session";

// Component for email verification
const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const secretCode = searchParams.get("secret_code");

  // Type definition for successful email verification response
  type VerifyEmailResponse = {
    status: string;
    data: {
      message: string;
      result: {
        user: {
          user_id: number;
          first_name: string;
          last_name: string;
          account_id: string;
          status: string;
          about: string;
          email: string;
          socials: {
            [key: string]: string;
          };
          profile_image_url: string;
          created_at: string;
          password_changed_at: string;
          is_active: boolean;
          is_email_verified: boolean;
        };
        access_token: string;
      };
    };
  };

  // Type definition for error response in email verification
  type VerifyEmailErrorResponse = {
    status: string;
    error: {
      message: string;
    };
  };

  useEffect(() => {
    // Function to verify email
    const verifyEmail = async () => {
      // Check if email and secretCode are present in the URL
      if (!email || !secretCode) {
        setError("Invalid verification link");
        return;
      }

      setLoading(true);
      try {
        // Send POST request to verify email
        const response = await fetch(`${BASE_URL}/users/verify-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            secret_code: secretCode,
            email: email,
          }),
        });

        if (response.ok) {
          const data: VerifyEmailResponse | VerifyEmailErrorResponse =
            await response.json();
          if ("data" in data && data.status !== "error") {
            // If verification is successful, set cookie and user data
            setCookie(
              "token",
              JSON.stringify(data.data.result.access_token),
              1
            );
            setUser("user", JSON.stringify(data.data.result.user));
            // Redirect to choose role page
            router.push("/auth/choose-role");
          } else {
            // If there's an error in the response, set the error message
            setError((data as VerifyEmailErrorResponse).error.message);
          }
        }
      } catch (error) {
        console.error("Verification error:", error);
        setError("Verification failed, Request for new link");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [email, secretCode]);

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if verification fails
  if (error) {
    return (
      <div className="text-red-800 flex flex-col items-center">
        <div>{error}</div>

        <Link href="/auth/verify" className="text-purple-600">
          Go back
        </Link>
      </div>
    );
  }

  return null;
};

export default VerifyEmail;
