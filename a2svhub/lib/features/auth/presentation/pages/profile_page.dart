import 'dart:io';
import 'package:a2svhub/core/widgets/navbar.dart';
import 'package:a2svhub/core/widgets/sidebar.dart';
import 'package:a2svhub/features/auth/presentation/Bloc/auth_bloc.dart';
import 'package:a2svhub/features/auth/presentation/Bloc/auth_event.dart';
import 'package:a2svhub/features/auth/presentation/Bloc/auth_state.dart';
import 'package:a2svhub/features/auth/presentation/pages/my_profile_page.dart';
import 'package:a2svhub/features/auth/presentation/pages/sign_in_page.dart';
import 'package:a2svhub/features/auth/presentation/widget/textfield_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'package:image_picker/image_picker.dart';

import 'package:shared_preferences/shared_preferences.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final _formKey = GlobalKey<FormState>();
  bool _isFormValid = false;

  final nameController = TextEditingController();
  final passwordController = TextEditingController();
  final universityController = TextEditingController();
  final leetCodeController = TextEditingController();
  final codeforcesController = TextEditingController();
  final githubController = TextEditingController();
  final languageController = TextEditingController();
  final hackerRankController = TextEditingController();
  final phoneController = TextEditingController();
  final telegramController = TextEditingController();
  final linkedinController = TextEditingController();
  final studentIdController = TextEditingController();
  final shortBioController = TextEditingController();
  final instagramController = TextEditingController();
  final birthdateController = TextEditingController();
  final cvLinkController = TextEditingController();
  final expectedGraduationDateController = TextEditingController();
  final tshirtColorController = TextEditingController();
  final tshirtSizeController = TextEditingController();
  final genderController = TextEditingController();
  final departmentController = TextEditingController();

  String? selectedGender;
  File? _selectedImage;

  void _validateForm() {
    setState(() {
      _isFormValid = _formKey.currentState?.validate() ?? false;
    });
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      setState(() {
        _selectedImage = File(pickedFile.path);
        _validateForm();
      });
    }
  }

  void _submitForm() {
    if (_formKey.currentState?.validate() ?? false) {
      final authBloc = context.read<AuthBloc>();

      final fields = {
        'name': nameController.text,
        'university': universityController.text,
        'leetcode': leetCodeController.text,
        'codeforces': codeforcesController.text,
        'github': githubController.text,
        'preferred_language': languageController.text,
        'hackerrank': hackerRankController.text,
        'phone': phoneController.text,
        'telegram_username': telegramController.text,
        'linkedin': linkedinController.text,
        'student_id': studentIdController.text,
        'short_bio': shortBioController.text,
        'instagram': instagramController.text,
        'birthday': birthdateController.text,
        'cv': cvLinkController.text,
        'expected_graduation_date': expectedGraduationDateController.text,
        'tshirt_color': tshirtColorController.text,
        'tshirt_size': tshirtSizeController.text,
        'gender': genderController.text,
        'password': passwordController.text,
        'department': departmentController.text,
      };

      authBloc.add(UpdateProfileEvent(fields: fields, photo: _selectedImage));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: TopNavBar(),
      drawer: Drawer(
        width: MediaQuery.of(context).size.width * 0.75,
        child: SidebarWidget(),
      ),
      body: BlocListener<AuthBloc, AuthState>(
        listener: (context, state) async {
          if (state is ProfileUpdated) {
            context.read<AuthBloc>().add(GetMyProfileEvent());
          } else if (state is MyProfileLoaded) {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => MyProfilePage()),
            );
          } else if (state is AuthError) {
            if (state.message.contains('session has expired')) {
              final prefs = await SharedPreferences.getInstance();
              await prefs.remove('accessToken');
              await prefs.remove('refreshToken');

              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => SignInScreen()),
              );
            } else {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text(state.message)),
              );
            }
          }
        },
        child: SingleChildScrollView(
          padding: EdgeInsets.all(16.sp),
          child: Form(
            key: _formKey,
            onChanged: _validateForm,
            child: Column(
              children: [
                GestureDetector(
                  onTap: _pickImage,
                  child: CircleAvatar(
                    radius: 40.w,
                    backgroundImage: _selectedImage != null
                        ? FileImage(_selectedImage!)
                        : null,
                  ),
                ),
                SizedBox(height: 12.sp),
                Text("Allowed: *jpeg, *jpg, *png, *.gif"),
                SizedBox(height: 10.sp),
                AppTextField(label: 'Name', controller: nameController, isRequired: true),
                AppTextField(label: 'Password', controller: passwordController),
                AppTextField(label: 'University', controller: universityController),
                AppTextField(label: 'LeetCode', controller: leetCodeController),
                AppTextField(label: 'Codeforces', controller: codeforcesController),
                AppTextField(label: 'GitHub', controller: githubController),
                AppTextField(label: 'Preferred Language', controller: languageController),
                AppTextField(label: 'HackerRank', controller: hackerRankController),
                AppTextField(label: 'Phone', controller: phoneController),
                AppTextField(label: 'Telegram Username', controller: telegramController),
                AppTextField(label: 'LinkedIn', controller: linkedinController),
                AppTextField(label: 'Student ID', controller: studentIdController),
                AppTextField(label: 'Short Bio', controller: shortBioController),
                AppTextField(
                  label: 'Birthdate',
                  controller: birthdateController,
                  readOnly: true,
                  onTap: () async {
                    final DateTime? pickedDate = await showDatePicker(
                      context: context,
                      initialDate: DateTime(2000),
                      firstDate: DateTime(1900),
                      lastDate: DateTime.now(),
                    );
                    if (pickedDate != null) {
                      setState(() {
                        birthdateController.text = "${pickedDate.toLocal()}".split(' ')[0];
                      });
                    }
                  },
                ),
                AppTextField(label: 'CV Link', controller: cvLinkController),
                AppTextField(
                  label: 'Expected Graduation Date',
                  controller: expectedGraduationDateController,
                ),
                AppTextField(label: 'T-shirt Color', controller: tshirtColorController),
                AppTextField(label: 'T-shirt Size', controller: tshirtSizeController),
                
                DropdownButtonFormField<String>(
                  value: selectedGender,
                  decoration: const InputDecoration(
                    labelText: 'Gender',
                    border: OutlineInputBorder(),
                  ),
                  items: ['male', 'female']
                      .map((gender) => DropdownMenuItem(
                            value: gender,
                            child: Text(gender),
                          ))
                      .toList(),
                  onChanged: (value) {
                    setState(() {
                      selectedGender = value;
                      genderController.text = value!;
                      _validateForm();
                    });
                  },
                  validator: (value) =>
                      value == null ? 'Please select your gender' : null,
                ),
                
                AppTextField(label: 'Department', controller: departmentController),
                SizedBox(height: 20.sp),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _isFormValid ? _submitForm : null,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _isFormValid ? Colors.green : Colors.grey,
                      foregroundColor: Colors.white,
                    ),
                    child: const Text("Submit"),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
