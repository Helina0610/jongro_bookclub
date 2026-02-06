export interface TableData {
  id: number;
}

export interface TraceDetailData extends TableData {
  name: string;
  context: {
    trace_id: string;
    span_id: string;
  };
  parent_id: string;
  start_time: string;
  end_time: string;
  status_code: string;
  status_message: string;
  attributes: {
    net_transport: string;
    net_peer_ip: string;
    net_peer_port: string;
    net_host_ip: string;
    net_host_port: string;
    http_method: string;
    http_target: string;
    http_server_name: string;
    http_route: string;
    http_user_agent: string;
    http_scheme: string;
    http_host: string;
    http_flavor: string;
  };
  events: {
    name: string;
    message: string;
    timestamp: string;
  }[];
  children?: TraceDetailData[];
}
