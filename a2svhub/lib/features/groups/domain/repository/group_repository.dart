

import 'package:a2svhub/core/error/failures.dart';
import 'package:a2svhub/features/groups/domain/entities/group_entity.dart';
import 'package:dartz/dartz.dart';

abstract class GroupRepository {
  Future<Either<Failure, GroupEntity>> getgroup(String id);
  
  Future<Either<Failure, List<GroupEntity>>> getgroups();

  
}
