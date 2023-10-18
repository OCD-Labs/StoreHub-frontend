export async function convertFile(file: File) {
  const FileBuffer = await new Response(file).arrayBuffer(); //fil array buffer
  var base64 = btoa(
    new Uint8Array(FileBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  const dataURI = "data:" + file.type + ";base64," + base64;
  return dataURI;
}
