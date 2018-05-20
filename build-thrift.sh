SCRIPT_DIR=$(cd `dirname $0` && pwd)
THRIFT_DIR="$SCRIPT_DIR/thrift"
CLIENT_DIR="$SCRIPT_DIR/client/src"
API_DIR="$SCRIPT_DIR/api/src"

docker run -v "$THRIFT_DIR:/data" thrift thrift -o /data --gen js:node /data/converter.thrift \
  && (rm -rf "$API_DIR/gen-nodejs"
      mkdir "$API_DIR/gen-nodejs"
      cp -a "$THRIFT_DIR/gen-nodejs" "$API_DIR"

      rm -rf "$CLIENT_DIR/gen-nodejs"
      mkdir "$CLIENT_DIR/gen-nodejs"
      cp -a "$THRIFT_DIR/gen-nodejs" "$CLIENT_DIR"

      rm -rf "$THRIFT_DIR/gen-nodejs")
