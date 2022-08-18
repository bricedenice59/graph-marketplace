import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  BlackListedAuthor,
  CourseActivated,
  CourseAdded,
  CourseAuthorAddressChanged,
  CourseDeactivated,
  CoursePurchased,
  WithdrawFunds
} from "../generated/Marketplace/Marketplace"

export function createBlackListedAuthorEvent(
  authorAddress: Address,
  isFrozen: boolean,
  timestamp: BigInt
): BlackListedAuthor {
  let blackListedAuthorEvent = changetype<BlackListedAuthor>(newMockEvent())

  blackListedAuthorEvent.parameters = new Array()

  blackListedAuthorEvent.parameters.push(
    new ethereum.EventParam(
      "authorAddress",
      ethereum.Value.fromAddress(authorAddress)
    )
  )
  blackListedAuthorEvent.parameters.push(
    new ethereum.EventParam("isFrozen", ethereum.Value.fromBoolean(isFrozen))
  )
  blackListedAuthorEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return blackListedAuthorEvent
}

export function createCourseActivatedEvent(courseId: Bytes): CourseActivated {
  let courseActivatedEvent = changetype<CourseActivated>(newMockEvent())

  courseActivatedEvent.parameters = new Array()

  courseActivatedEvent.parameters.push(
    new ethereum.EventParam("courseId", ethereum.Value.fromFixedBytes(courseId))
  )

  return courseActivatedEvent
}

export function createCourseAddedEvent(
  courseId: Bytes,
  authorAddress: Address,
  timestamp: BigInt
): CourseAdded {
  let courseAddedEvent = changetype<CourseAdded>(newMockEvent())

  courseAddedEvent.parameters = new Array()

  courseAddedEvent.parameters.push(
    new ethereum.EventParam("courseId", ethereum.Value.fromFixedBytes(courseId))
  )
  courseAddedEvent.parameters.push(
    new ethereum.EventParam(
      "authorAddress",
      ethereum.Value.fromAddress(authorAddress)
    )
  )
  courseAddedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return courseAddedEvent
}

export function createCourseAuthorAddressChangedEvent(
  previousAddress: Address,
  newAddress: Address
): CourseAuthorAddressChanged {
  let courseAuthorAddressChangedEvent = changetype<CourseAuthorAddressChanged>(
    newMockEvent()
  )

  courseAuthorAddressChangedEvent.parameters = new Array()

  courseAuthorAddressChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAddress",
      ethereum.Value.fromAddress(previousAddress)
    )
  )
  courseAuthorAddressChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return courseAuthorAddressChangedEvent
}

export function createCourseDeactivatedEvent(
  courseId: Bytes
): CourseDeactivated {
  let courseDeactivatedEvent = changetype<CourseDeactivated>(newMockEvent())

  courseDeactivatedEvent.parameters = new Array()

  courseDeactivatedEvent.parameters.push(
    new ethereum.EventParam("courseId", ethereum.Value.fromFixedBytes(courseId))
  )

  return courseDeactivatedEvent
}

export function createCoursePurchasedEvent(
  courseId: Bytes,
  buyer: Address,
  timestamp: BigInt
): CoursePurchased {
  let coursePurchasedEvent = changetype<CoursePurchased>(newMockEvent())

  coursePurchasedEvent.parameters = new Array()

  coursePurchasedEvent.parameters.push(
    new ethereum.EventParam("courseId", ethereum.Value.fromFixedBytes(courseId))
  )
  coursePurchasedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  coursePurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return coursePurchasedEvent
}

export function createWithdrawFundsEvent(
  toAddress: Address,
  success: boolean
): WithdrawFunds {
  let withdrawFundsEvent = changetype<WithdrawFunds>(newMockEvent())

  withdrawFundsEvent.parameters = new Array()

  withdrawFundsEvent.parameters.push(
    new ethereum.EventParam("toAddress", ethereum.Value.fromAddress(toAddress))
  )
  withdrawFundsEvent.parameters.push(
    new ethereum.EventParam("success", ethereum.Value.fromBoolean(success))
  )

  return withdrawFundsEvent
}
