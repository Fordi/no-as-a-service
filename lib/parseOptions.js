import { relative } from "node:path";
import intArg from "./intArg.js";

console.log(process.cwd(), process.argv[1]);

const usage = (msg) => {
  const help = [
    `node ${relative(process.cwd(), process.argv[1]) || '.'} [{--port|-p} <portNumber>] [{--rate|-r} <rateLimit>] [{--help|-h|-?}]`,
    `--port | -p       Port to use for server`,
    `--rate | -r       Maximum request rate, in requests / minute / IP address`,
    `--help | -h | -?  This help message`
  ];
  if (msg) {
    help.unshift(`Error: ${msg}`);
    console.warn(help.join('\n'));
    process.exit(-1);
  } else {
    console.info(help.join('\n'));
    process.exit();
  }
}

export default function parseOptions(env, argv) {
  const options = {
    port: intArg(env.PORT, 3000, 1024, 65535),
    rate: intArg(env.LIMIT_RATE, 10, 0),
  };
  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '--port':
      case '-p':
        i++;
        options.port = intArg(argv[i], options.port, 1024, 65535);
        break;
      case '--rate':
      case '-r':
        i++;
        options.rate = intArg(argv[i], options.rate, 0);
        break;
      case '--help':
      case '-h':
      case '-?':
        usage();
      default:
        usage(`Unrecognized option: ${argv[i]}`);
    }
  }
  return options;
};