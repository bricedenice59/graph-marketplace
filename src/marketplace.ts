import {
  CourseItem, CourseAuthor, PurchasedItem, BlacklistedAuthorItem
} from '../generated/schema'
import {
  CourseActivated as CourseActivatedEvent,
  CourseAdded as CourseAddedEvent,
  CourseDeactivated as CourseDeactivatedEvent,
  CoursePurchased as CoursePurchasedEvent,
  BlackListedAuthor as BlackListedEvent
} from "../generated/Marketplace/Marketplace"

export function handleCourseAdded(event: CourseAddedEvent): void {
  let courseItem = CourseItem.load(event.params.courseId.toHexString());
  if (!courseItem) {
    courseItem = new CourseItem(event.params.courseId.toHexString());
    courseItem.author = event.params.authorAddress.toHexString();
    courseItem.status = "Activated";
    courseItem.createdAtTimestamp = event.params.timestamp;
    courseItem.save();
  }

  let courseAuthor = CourseAuthor.load(event.params.authorAddress.toHexString());
  if(!courseAuthor)
  {
    courseAuthor = new CourseAuthor(event.params.authorAddress.toHexString());
    courseAuthor.address = event.params.authorAddress;
  }
  else{
    courseAuthor.address = event.params.authorAddress;
  }

  courseAuthor.save();
}

export function handleBlackListedAuthor(event: BlackListedEvent): void {
  let blackListedAuthor = BlacklistedAuthorItem.load(event.params.authorAddress);
  if(!blackListedAuthor)
  {
    blackListedAuthor = new BlacklistedAuthorItem(event.params.authorAddress);
    blackListedAuthor.isFrozen = event.params.isFrozen;
    blackListedAuthor.createdAtTimestamp = event.params.timestamp;
  }
  else{
    blackListedAuthor.isFrozen = event.params.isFrozen;
    blackListedAuthor.createdAtTimestamp = event.params.timestamp;
  }
  blackListedAuthor.save();

  // course author does exist in contract for sure as I enfoce to revert freeze account transaction if not.
  let courseAuthor = CourseAuthor.load(event.params.authorAddress.toHexString());
  courseAuthor!.blacklistedStatus = blackListedAuthor.id;
  courseAuthor!.save();
}

export function handleCourseActivated(event: CourseActivatedEvent): void {
  let courseItem = CourseItem.load(event.params.courseId.toHexString());
  courseItem!.status = "Activated";
  courseItem!.save();
}

export function handleCourseDeactivated(event: CourseDeactivatedEvent): void {
  let courseItem = CourseItem.load(event.params.courseId.toHexString());
  courseItem!.status = "Deactivated";
  courseItem!.save();
}

export function handleCoursePurchased(event: CoursePurchasedEvent): void {
  let purchasedItem = PurchasedItem.load(event.params.courseId.toHexString());
  if(!purchasedItem){
    purchasedItem = new PurchasedItem(event.params.courseId.toHexString());
    purchasedItem.buyer = event.params.buyer;
    purchasedItem.createdAtTimestamp = event.params.timestamp;
    purchasedItem.save();
  }
}
