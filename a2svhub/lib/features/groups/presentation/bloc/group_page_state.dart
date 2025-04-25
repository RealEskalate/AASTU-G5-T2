



import 'package:a2svhub/features/groups/domain/entities/group_entity.dart';
import 'package:equatable/equatable.dart';

abstract class GrouppageState extends Equatable {
  const GrouppageState();

  @override
  List<Object> get props => [];
}

class GrouppageInitial extends GrouppageState {}

class GroupPageLoading extends GrouppageState {
  const GroupPageLoading();
}

class GroupPageLoaded extends GrouppageState {
  final List<GroupEntity> groups;
  GroupPageLoaded({required this.groups});
  List<Object> get props => [groups];
}

class GroupPageRefresh extends GrouppageState {
  final List<GroupEntity> groups;
  GroupPageRefresh({required this.groups});
  List<Object> get props => [groups];
}

class GroupPageError extends GrouppageState {
  final String Message;
  GroupPageError({required this.Message});
  List<Object> get props => [Message];
}
