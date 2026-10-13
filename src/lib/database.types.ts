export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          display_name?: string;
          email?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      organization_members: {
        Row: {
          id: string;
          organization_id: string;
          user_id: string;
          role: "owner" | "admin" | "member";
          status: "active" | "invited" | "disabled";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          user_id: string;
          role?: "owner" | "admin" | "member";
          status?: "active" | "invited" | "disabled";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          role?: "owner" | "admin" | "member";
          status?: "active" | "invited" | "disabled";
          updated_at?: string;
        };
        Relationships: [];
      };
      workflows: {
        Row: {
          id: string;
          organization_id: string;
          customer_name: string;
          amount_cents: number;
          currency: string;
          description: string;
          status:
            | "request"
            | "quote"
            | "payment"
            | "verification"
            | "confirmed"
            | "cancelled";
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          customer_name: string;
          amount_cents: number;
          currency?: string;
          description?: string;
          status?:
            | "request"
            | "quote"
            | "payment"
            | "verification"
            | "confirmed"
            | "cancelled";
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          customer_name?: string;
          amount_cents?: number;
          currency?: string;
          description?: string;
          status?:
            | "request"
            | "quote"
            | "payment"
            | "verification"
            | "confirmed"
            | "cancelled";
          updated_at?: string;
        };
        Relationships: [];
      };
      workflow_events: {
        Row: {
          id: string;
          workflow_id: string;
          organization_id: string;
          actor_id: string;
          event_type: string;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          workflow_id: string;
          organization_id: string;
          actor_id: string;
          event_type: string;
          body: string;
          created_at?: string;
        };
        Update: never;
        Relationships: [];
      };
      trial_leads: {
        Row: {
          id: string;
          name: string;
          work_email: string;
          company: string;
          role: string;
          company_size: string;
          workflow_volume: string;
          message: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          work_email: string;
          company: string;
          role: string;
          company_size: string;
          workflow_volume: string;
          message?: string;
          source?: string;
          created_at?: string;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type OrganizationRole =
  Database["public"]["Tables"]["organization_members"]["Row"]["role"];

export type WorkflowStatus =
  Database["public"]["Tables"]["workflows"]["Row"]["status"];
