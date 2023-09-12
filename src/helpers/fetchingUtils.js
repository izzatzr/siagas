export const processResult = (res, options) => {
  if (res?.ok) {
    if (options?.rawResponse) {
      return res;
    } else {
      return res.json().catch((e) => {
        console.error("parse json error", e);

        return res;
      });
    }
  } else {
    console.error("Error fetch", {
      url: res.url,
      options: options,
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
    });
    throw new Error(`[${res.status}] ${res.statusText}`);
  }
};

export const throwErrorUtil = (e, message) => {
  if (
    e?.message === 'Failed to fetch' &&
    navigator?.onLine === false
  ) {
    throw Error(
      `Ooops... Terjadi sebuah kesalahan, harap coba lagi nanti.`
    );
  }

  throw Error(message);
};
