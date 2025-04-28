import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart'; // Added for responsiveness

class LatestSubmissionTile extends StatelessWidget {
  final String name;
  final String problem;
  final String imageUrl;
  final VoidCallback onTap;

  const LatestSubmissionTile({
    Key? key,
    required this.name,
    required this.problem,
    required this.imageUrl,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: CircleAvatar(
        backgroundImage: NetworkImage(imageUrl),
        radius: 30.w, // .w for responsive radius
      ),
      title: Text(
        name,
        style: TextStyle(
          fontSize: 16.sp, // .sp for responsive font size
        ),
      ),
      subtitle: Text(
        problem,
        style: TextStyle(
          fontSize: 14.sp, // .sp for responsive font size
        ),
      ),
      onTap: onTap,
    );
  }
}
