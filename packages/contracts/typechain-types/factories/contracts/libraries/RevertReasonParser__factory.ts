/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  RevertReasonParser,
  RevertReasonParserInterface,
} from "../../../contracts/libraries/RevertReasonParser";

const _abi = [
  {
    inputs: [],
    name: "InvalidRevertReason",
    type: "error",
  },
] as const;

const _bytecode =
  "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212200c6e7840f6b32c56c54317657a9fd5fb24fb491fc49a09c752e5729348862c4564736f6c63430008110033";

type RevertReasonParserConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RevertReasonParserConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RevertReasonParser__factory extends ContractFactory {
  constructor(...args: RevertReasonParserConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      RevertReasonParser & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): RevertReasonParser__factory {
    return super.connect(runner) as RevertReasonParser__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RevertReasonParserInterface {
    return new Interface(_abi) as RevertReasonParserInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): RevertReasonParser {
    return new Contract(address, _abi, runner) as unknown as RevertReasonParser;
  }
}