// Incomplete, update if needed
export type Policy = {
  Statement?: {
    Effect?: 'Allow' | 'Deny';
    Resource?: string;
    Condition?: {
      ArnLike?: {
        'AWS:SourceArn'?: string;
      };
    };
  }[];
};
