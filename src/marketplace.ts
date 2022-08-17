import {
  CourseItem, CourseAuthor, PurchasedItem
} from '../generated/schema'

import {
  CourseActivated as CourseActivatedEvent,
  CourseAdded as CourseAddedEvent,
  CourseAuthorAdded as CourseAuthorEvent,
  CourseDeactivated as CourseDeactivatedEvent,
  CoursePurchased as CoursePurchasedEvent,
} from "../generated/Marketplace/Marketplace"


export function handleCourseAdded(event: CourseAddedEvent): void {
  let courseItem = CourseItem.load(event.params.courseId.toHexString());
  if (!courseItem) {
    courseItem = new CourseItem(event.params.courseId.toHexString());
    courseItem.author = event.params.courseAuthorId.toHexString();
    courseItem.status = "Activated";
    courseItem.save();
  }
}

export function handleCourseAuthorAdded(event: CourseAuthorEvent): void {
  let courseAuthor = CourseAuthor.load(event.params.courseAuthorId.toHexString());
  if(!courseAuthor)
  {
    courseAuthor = new CourseAuthor(event.params.courseAuthorId.toHexString());
    courseAuthor.address = event.params.author;
    courseAuthor.save();
  }
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
    purchasedItem.save();
  }
}



