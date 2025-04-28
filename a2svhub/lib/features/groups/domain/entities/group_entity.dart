import 'package:a2svhub/features/groups/domain/entities/head_entity.dart';
import 'package:a2svhub/features/groups/domain/entities/student_entity.dart';

class GroupEntity {
  final int id;
  final String name;
  final String shortName;
  final String description;
  final String country;
  final int? hoaId;
  final String? hoaName;
  final List<StudentEntity> students;
  final List<HeadEntity> heads;

  GroupEntity({
    required this.id,
    required this.name,
    required this.shortName,
    required this.description,
    required this.country,
    this.hoaId,
    this.hoaName,
    this.students = const [],
    this.heads = const [],
  });
}
