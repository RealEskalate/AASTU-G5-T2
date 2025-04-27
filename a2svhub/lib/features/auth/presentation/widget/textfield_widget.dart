import 'package:flutter/material.dart';

class AppTextField extends StatelessWidget {
  final String label;
  final TextEditingController controller;
  final bool isRequired;
  final bool isDropdown;
  final List<String>? dropdownItems;
  final VoidCallback? onTap;
  final bool readOnly;
  final Widget? suffixIcon;


  const AppTextField({
    super.key,
    required this.label,
    required this.controller,
    this.isRequired = false,
    this.isDropdown = false,
    this.dropdownItems,
    this.onTap,
    this.readOnly = false,
    this.suffixIcon
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      readOnly: readOnly,
      onTap: onTap,
      validator: (value) {
        if (isRequired && (value == null || value.trim().isEmpty)) {
          return '$label is required';
        }
        return null;
      },
      decoration: InputDecoration(
        labelText: isRequired ? "$label *" : label,
        floatingLabelBehavior: FloatingLabelBehavior.auto,
        floatingLabelStyle: const TextStyle(
          backgroundColor: Colors.white,
          fontSize: 14,
        ),
        filled: true,
        fillColor: Colors.white,
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 20),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        enabledBorder: OutlineInputBorder(
          borderSide: const BorderSide(color: Colors.grey),
          borderRadius: BorderRadius.circular(8),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: const BorderSide(color: Colors.green, width: 1.5),
          borderRadius: BorderRadius.circular(8),
        ),
       suffixIcon: suffixIcon ?? (isDropdown ? const Icon(Icons.arrow_drop_down) : null),
      ),
    );
  }
}