import { PartialType } from "@nestjs/mapped-types";
import { Register } from "./register.dto";

export class Upadtedto extends PartialType(Register){}