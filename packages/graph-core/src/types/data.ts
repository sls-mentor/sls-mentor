export type Node = {
  arn: string;
};

export type Edge = {
  from: string;
  to: string;
};

export type Data = {
  nodes: { [arn: string]: Node };
  edges: Edge[];
};
