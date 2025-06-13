export type Prediction = {
  departure: {
    scheduled?: string;
    expected?: string;
  };
  route?: {
    short_name?: string;
  };
};