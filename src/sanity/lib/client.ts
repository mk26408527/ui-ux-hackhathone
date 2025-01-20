import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "1updc3qw",
  dataset: "production",
  apiVersion: "2024-01-07",
  useCdn: false,
  token:"sk2mK8stdBxhHP6uqtc0gkYAlE2RWz138LatxmBy8ovGUUqJh3i3NBHN0HulJKjJS9xEHDrdurtP7KPq7kyQKC7yKD3NoayA2fjbTeQnuLkvusQaSBH3WUJ2Q5hCYnAfS49WKfuSURzdsNkY7arFJOM3akZ7mI7rDSoDADYlnYMKjz3Hqpit",
});
