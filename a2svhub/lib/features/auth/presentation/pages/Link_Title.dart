import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class LinkTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final String url;

  const LinkTile({
    super.key,
    required this.icon,
    required this.label,
    required this.url,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 4.h),  // .h for vertical padding
      child: Row(
        children: [
          Icon(icon, size: 20.sp),  // .sp for responsive icon size
          SizedBox(width: 8.w),  // .w for horizontal spacing
          Expanded(child: Text(label, style: TextStyle(fontSize: 16.sp))),  // .sp for responsive text size
          GestureDetector(
            onTap: () {
              // You might use url_launcher here if needed
            },
            child: Text(
              url,
              style: TextStyle(color: Colors.blue, fontSize: 16.sp),  // .sp for responsive font size
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}
