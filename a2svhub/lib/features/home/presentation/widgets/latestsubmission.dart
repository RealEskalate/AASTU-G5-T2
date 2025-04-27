import 'package:flutter/material.dart';

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
      ),
      title: Text(name),
      subtitle: Text(problem),
      onTap: onTap,
    );
  }
}
