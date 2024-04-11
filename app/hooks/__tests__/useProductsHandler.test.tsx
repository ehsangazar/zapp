import { act } from "react-dom/test-utils";
import useProductsHandler from "../useProductsHandler";
import { renderHook } from "@testing-library/react";

jest.mock("../../../prisma/types/IProduct", () => ({
  productSchema: {
    validate: jest.fn().mockReturnValue({
      catch: jest.fn().mockResolvedValue({ errors: [] }),
    }),
  },
}));

test("initFromCSV to be working", async () => {
  const { result } = renderHook(() => useProductsHandler());

  const { initFromCSV } = result.current;

  act(() => {
    const errors = initFromCSV([["1", "SK-123", "desc", "store"]]);
    expect(errors).toStrictEqual([]);
  });
});

test("initFromAPI returns errors", async () => {
  const { result } = renderHook(() =>
    useProductsHandler([
      {
        quantity: 1,
        sku: "123",
        oldSku: "123",
        description: "desc",
        store: "store",
        isSaved: false,
      },
    ])
  );

  const { initFromCSV } = result.current;

  act(() => {
    const errors = initFromCSV([["1", "123", "desc", "store"]]);
    expect(errors).toStrictEqual(["123"]);
  });
});

test("initFromAPI to be working", async () => {
  const { result } = renderHook(() => useProductsHandler());

  const { initFromAPI } = result.current;

  act(() => {
    initFromAPI([
      {
        quantity: 1,
        sku: "123",
        oldSku: "123",
        description: "desc",
        store: "store",
        isSaved: false,
      },
    ]);
  });

  expect(result.current.products).toStrictEqual([
    {
      quantity: 1,
      sku: "123",
      oldSku: "123",
      description: "desc",
      store: "store",
      isSaved: true,
    },
  ]);
});

test("ifSkusExists to be working", async () => {
  const { result } = renderHook(() =>
    useProductsHandler([
      {
        quantity: 1,
        sku: "SK-123",
        oldSku: "SK-123",
        description: "desc",
        store: "store",
        isSaved: false,
      },
    ])
  );

  const { ifSkusExists } = result.current;

  act(() => {
    const exists = ifSkusExists("SK-123");
    expect(exists).toBe(true);
  });
});

test("update to be working", async () => {
  const { result } = renderHook(() =>
    useProductsHandler([
      {
        quantity: 1,
        sku: "123",
        oldSku: "123",
        description: "desc",
        store: "store",
        isSaved: false,
      },
    ])
  );

  const { update } = result.current;

  act(() => {
    update("123", {
      quantity: 2,
      sku: "123",
      oldSku: "123",
      description: "desc",
      store: "store",
      isSaved: false,
    });
  });

  expect(result.current.products).toStrictEqual([
    {
      quantity: 2,
      sku: "123",
      oldSku: "123",
      description: "desc",
      store: "store",
      isSaved: false,
    },
  ]);
});

test("getToSaveProducts to be working", async () => {
  const { result } = renderHook(() =>
    useProductsHandler([
      {
        quantity: 1,
        sku: "123",
        oldSku: "123",
        description: "desc",
        store: "store",
        isSaved: false,
      },
    ])
  );

  const { getToSaveProducts } = result.current;

  act(() => {
    const toSave = getToSaveProducts();
    expect(toSave).toStrictEqual([
      {
        quantity: 1,
        sku: "123",
        oldSku: "123",
        description: "desc",
        store: "store",
      },
    ]);
  });
});

test("getToSaveProducts to be working but return nothing", async () => {
  const { result } = renderHook(() =>
    useProductsHandler([
      {
        quantity: 1,
        sku: "123",
        oldSku: "123",
        description: "desc",
        store: "store",
        isSaved: true,
      },
    ])
  );

  const { getToSaveProducts } = result.current;

  act(() => {
    const toSave = getToSaveProducts();
    expect(toSave).toStrictEqual([]);
  });
});

test("add to be working", async () => {
  const { result } = renderHook(() => useProductsHandler());

  const { add } = result.current;

  act(() => {
    add({
      quantity: 1,
      sku: "123",
      oldSku: "123",
      description: "desc",
      store: "store",
      isSaved: false,
    });
  });

  expect(result.current.products).toStrictEqual([
    {
      quantity: 1,
      sku: "123",
      oldSku: "123",
      description: "desc",
      store: "store",
      isSaved: false,
    },
  ]);
});

test("add to be working but return error", async () => {
  const { result } = renderHook(() =>
    useProductsHandler([
      {
        quantity: 1,
        sku: "SK-123",
        oldSku: "SK-123",
        description: "desc",
        store: "store",
        isSaved: false,
      },
    ])
  );

  const { add } = result.current;

  act(() => {
    const error = add({
      quantity: 1,
      sku: "SK-123",
      oldSku: "SK-123",
      description: "desc",
      store: "store",
      isSaved: false,
    });
    expect(error).toBe("SKU already exists");
  });
});
