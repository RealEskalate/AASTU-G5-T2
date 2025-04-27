import 'package:flutter/material.dart';

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
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          Icon(icon, size: 20),
          const SizedBox(width: 8),
          Expanded(child: Text(label)),
          GestureDetector(
            onTap: () {
              // You might use url_launcher here if needed
            },
            child: Text(
              url,
              style: const TextStyle(color: Colors.blue),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}
