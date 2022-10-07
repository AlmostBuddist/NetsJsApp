import { Readable, Stream } from 'stream';

import HTTP_HEADERS from '../../application/http/constants/http-headers.const';
import IP_ADDRESS_REGEXP from '../../application/http/constants/ip-address-regexp.const';

export const isIpAddress = (ip: string): boolean => {
  return IP_ADDRESS_REGEXP.IP_V4.test(ip) || IP_ADDRESS_REGEXP.IP_V6.test(ip);
};

export const getClientIpFromForwardedFor = (value: string): string => {
  if (!value) {
    return '';
  }

  const forwardedIps = value.split(',').map((ipAddress) => ipAddress.trim().split(':')[0]);

  return forwardedIps.find(isIpAddress);
};

export const getIpByHeaders = (headers: Record<string, string>): string | undefined => {
  const xForwardedFor = getClientIpFromForwardedFor(
    headers[HTTP_HEADERS.X_FORWARD_FOR.toLowerCase()],
  );

  if (xForwardedFor) {
    return xForwardedFor;
  }

  const xRealIp = headers[HTTP_HEADERS.X_REAL_IP.toLowerCase()];

  if (isIpAddress(xRealIp)) {
    return xRealIp;
  }
};

export const getReadStreamFromBuffer = (buffer: Buffer): Readable => {
  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
};

export const getBufferFromReadStream = async (stream: Stream): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const data: Uint8Array[] = [];

    stream.on('data', (chunk) => {
      data.push(chunk);
    });

    stream.on('end', () => {
      resolve(Buffer.concat(data));
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const getValidationErrorMessages = (details: any[]): string[] => {
  return details.reduce((sum, cur) => {
    if (cur.constraints) {
      sum.push(...Object.values(cur.constraints));
    }

    if (cur.children?.length) {
      sum.push(...getValidationErrorMessages(cur.children));
    }

    return sum;
  }, []);
};
