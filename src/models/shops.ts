export interface OpeningHour {
        id: number;
        shop_id: number;
        day: string;
        open: string;
        close: string;
        created_at: string;
        updated_at: string;
    }
    
export interface Shops {
        id: number;
        name: string;
        email: string;
        phone: string;
        created_at: string;
        updated_at: string;
        opening_hour: OpeningHour[];
    }