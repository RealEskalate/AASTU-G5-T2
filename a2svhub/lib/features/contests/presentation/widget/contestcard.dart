import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ContestCard extends StatelessWidget {
  final String title;
  final String problems;
  final String timeAgo;

  const ContestCard({
    super.key,
    required this.title,
    required this.problems,
    required this.timeAgo,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 8.h),  // .h for responsive margin
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16.r),  // .r for responsive border radius
      ),
      elevation: 1,
      child: ListTile(
        contentPadding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 10.h),  // .w and .h for responsive padding
        title: Text(
          title,
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16.sp),  // .sp for responsive font size
        ),
        subtitle: Text('$problems • $timeAgo'),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children:  [
            Icon(Icons.group, color: Colors.green),
            SizedBox(width: 8.w),  // .w for responsive spacing
            Icon(Icons.open_in_new, color: Colors.green),
          ],
        ),
      ),
    );
  }
}
