const ParamCreator = (value: any, isInitial?: boolean) => {
  let params: string[] = [];

  const paramCreator = (name: string, value: any, isInitial?: boolean) => {
    if (isInitial) return name + "=" + value;

    return "&" + name + "=" + value;
  };

  Object.keys(value).map((data: any) => {
    if (value[data].value !== null) {
      //to handle the array type params
      if (Array.isArray(value[data].value)) {
        value[data].value.map((param: string) => {
          params.push(paramCreator(value[data].name, param, isInitial));
          return null;
        });
      } else {
        params.push(
          paramCreator(value[data].name, value[data].value, isInitial)
        );
      }
    }

    return null;
  });

  const removeNull = params.filter((param: any) => param);

  let paramString;

  if (isInitial) {
    paramString = (removeNull.length ? "?" : "") + removeNull.join("&");
  } else {
    paramString = removeNull.join("");
  }

  return paramString;
};

export default ParamCreator;
