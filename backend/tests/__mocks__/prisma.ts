import { vi } from "vitest";

export const prismaMock = {
  folder: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
};
