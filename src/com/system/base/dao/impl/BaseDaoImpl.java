package com.system.base.dao.impl;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.persister.entity.AbstractEntityPersister;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.system.base.dao.BaseDao;
import com.system.base.processors.MapResultTransformer;


public class BaseDaoImpl extends HibernateDaoSupport implements BaseDao {
	
	private InsertListener insertListener;
	
	
	public BaseDaoImpl(){}
	
	/**
	 * 提供多数据源注入方式
	 * @param sessionFactory
	 */
	public BaseDaoImpl(SessionFactory sessionFactory){
		super.setSessionFactory(sessionFactory);
	}

	/**
	 * 用于批量添加时的监听 void inserts(Object[] objects)
	 * @param insertListener 批量添加前后监听�?
	 */
	@Override
	public void addInsertListener(InsertListener insertListener) {
		if(insertListener!=null){
			this.insertListener=insertListener;
		}
	}
	
	/**
	 * 移除批量添加前后监听�?
	 */
	@Override
	public void removeInsertListener() {
		insertListener=null;
	}

	/**
	 * 创建ID 
	 * @param prefix 前缀
	 * @return �?��建ID
	 */
	@Override
	public String createSeqid(String prefix) {
		return (String) getHibernateTemplate().getSessionFactory()
				.getCurrentSession().createSQLQuery(
						"select get_seqid(?) seqid from dual").addScalar(
						"seqid", Hibernate.STRING).setString(0, prefix)
				.uniqueResult();
	}

	/**
	 * 删除实体对象
	 * @param clazz 要删除实体对象class
	 * @param id 要删除实体对象iD
	 */
	@Override
	public void delete(Class clazz,Serializable id) {
		getSessionFactory().getCurrentSession().delete(this.get(clazz, id));
	}
	
	/**
	 * 删除实体对象
	 * @param object 要删除实体对�?
	 */
	@Override
	public void delete(Object object) {
		getSessionFactory().getCurrentSession().delete(object);
	}

	/**
	 * 批量删除 
	 * @param tableName 数据库表�?
	 * @param columName 数据库表主键对应的列�?
	 * @param ids 主键数组
	 * @return 执行结果数组
	 * @exception 当有�?��数据删除出错，就会抛出异�?
	 */
	@Override
	public int[] deletes(String tableName, String columName, Serializable[] ids) throws Exception{
		int[] result=null;
		Connection con=getSessionFactory().getCurrentSession().connection();
		PreparedStatement pst=con.prepareStatement("delete from "+tableName+" where "+columName+"=?");
		con.setAutoCommit(false);  
		for(Object id:ids){
			pst.setObject(1, id);
			pst.addBatch();
		}
		result=pst.executeBatch();  
		con.commit();  
			
		return result;
	}

	/**
	 * 执行sql语句增删�?
	 * @param sql sql语句
	 * @return 执行结果
	 */
	@Override
	public int executeSql(String sql) {
		return getSessionFactory().getCurrentSession().createSQLQuery(sql).executeUpdate();
	}

	
	/**
	 * 执行sql语句增删�?
	 * @param sql sql语句
	 * @param args 参数
	 * @return 执行结果
	 */
	@Override
	public int executeSql(String sql, Object[] args){
		SQLQuery sq = getSessionFactory().getCurrentSession().createSQLQuery(sql);
		if(args!=null){
			if(args.length>0){
				for(int i=0;i<args.length;i++){
					sq.setParameter(i, args[i]);
				}
			}
		}
		return sq.executeUpdate();
	}
	
	/**
	 * 用于通过主键值查询实体对�?
	 * @param clazz 实体对象Class
	 * @param id 主键�?
	 * @return 查到的实体对象�?没有则返回null
	 */
	@Override
	public Object get(Class clazz, Serializable id) {
		// TODO Auto-generated method stub
		return getSessionFactory().getCurrentSession().get(clazz, id);
	}
	
	

	/**
	 * 用于查询总记录的个数<br>
	 * 不需�?加select count(*) 
	 * @param hql hql查询语句
	 * @return 记录的个�?
	 */
	@Override
	public int getCount(String hql) {
		try {
			String hqlTrue=Pattern.compile("order\\s+by[^)]*$",Pattern.CASE_INSENSITIVE).matcher(hql).replaceAll("");
			if(hqlTrue.startsWith("from")){
					hqlTrue="select count(*) "+hqlTrue;
			}
			return Integer.parseInt(getSessionFactory().getCurrentSession().createQuery(hqlTrue).uniqueResult().toString());
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}


	/**
	 * hql获得对象条数
	 * @param hql hql查询语句 (from User where name=? and sex=?)
	 * @param args 查询参数
	 * @return 对象条数
	 */
	@Override
	public int getCount(String hql, Object[] args) {
		String hqlTrue=Pattern.compile("order\\s+by[^)]*$",Pattern.CASE_INSENSITIVE).matcher(hql).replaceAll("");;
		if(hqlTrue.startsWith("from")){
				hqlTrue="select count(*) "+hqlTrue;
		}
		Query query=getSessionFactory().getCurrentSession().createQuery(hqlTrue);
		if(args!=null){
			if(args.length>0){
				for(int i=0;i<args.length;i++){
					query.setParameter(i, args[i]);
				}
			}
		}
		try{
			return Integer.parseInt(query.uniqueResult().toString());
		}catch (Exception e) {
			return -1;
		}
	}


	

	/**
	 * 获取单个对象
	 * @param hql hql查询语句 (from User where name='tom')
	 * @return 查询的实体对象�?没有或查到多条则返回null
	 */
	@Override
	public Object getOne(String hql) {
		try {
			return getSessionFactory().getCurrentSession().createQuery(hql).uniqueResult();
		} catch (Exception e) {
			return null;
		}
	}
	
	/**
	 * 获取单个对象
	 * @param hql hql查询语句 (from User where name='tom')
	 * @param args 查询参数
	 * @return 查询的实体对象�?没有或查到多条则返回null
	 */
	@Override
	public Object getOne(String hql,Object[] args) {
		try {
			Query query=getSessionFactory().getCurrentSession().createQuery(hql);
			if(args!=null){
				if(args.length>0){
					for(int i=0;i<args.length;i++){
						query.setParameter(i, args[i]);
					}
				}
			}
			return query.uniqueResult();
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 获取sql语句记录数量<br>
	 * 不用�?select count(*)
	 * @param sql sql查询语句
	 * @return 记录条数
	 */
	@Override
	public int getSqlCount(String sql) {
		try{
			sql=Pattern.compile("order\\s+by[^)]*$",Pattern.CASE_INSENSITIVE).matcher(sql).replaceAll("");
			return Integer.parseInt(getSessionFactory().getCurrentSession().createSQLQuery("select count(*) from ("+sql+") table1").uniqueResult().toString());
		}catch (Exception e) {
			return -1;
		}
	}
	
	/**
	 * 获取sql语句记录数量<br>
	 * 不用�?select count(*)
	 * @param sql sql查询语句
	 * @param args 查询参数
	 * @return 记录条数
	 */
	@Override
	public int getSqlCount(String sql,Object[] args) {
		try{
			sql=Pattern.compile("order\\s+by[^)]*$",Pattern.CASE_INSENSITIVE).matcher(sql).replaceAll("");
			Query query=getSessionFactory().getCurrentSession().createSQLQuery("select count(*) from ("+sql+") table1");
			if(args!=null){
				if(args.length>0){
					for(int i=0;i<args.length;i++){
						query.setParameter(i, args[i]);
					}
				}
			}
			return Integer.parseInt(query.uniqueResult().toString());
		}catch (Exception e) {
			return -1;
		}
	}

	/**
	 * 使用sql语句查询数据集合
	 * @param sql sql查询语句
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	@Override
	public List getSqlList(String sql) {
		// TODO Auto-generated method stub
		return getSessionFactory().getCurrentSession().createSQLQuery(sql).list();
	}
	/**
	 * 使用sql语句查询数据集合
	 * @param sql sql查询语句
	 * @param args 查询参数
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	@Override
	public List getSqlList(String sql,Object[] args) {
		// TODO Auto-generated method stub
		Query query=getSessionFactory().getCurrentSession().createSQLQuery(sql);
		if(args!=null){
			if(args.length>0){
				for(int i=0;i<args.length;i++){
					query.setParameter(i, args[i]);
				}
			}
		}
		return query.list();
	}
	
	/**
	 * 使用sql语句查询数据集合,用于分页查询
	 * @param sql sql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	@Override
	public List getSqlList(String sql,int pagesize, int currpage) {
		// TODO Auto-generated method stub
		return getSessionFactory().getCurrentSession().createSQLQuery(sql).setFirstResult((currpage-1)*pagesize).setMaxResults(pagesize).list();
	}
	
	/**
	 * 使用sql语句查询数据集合,用于分页查询
	 * @param sql sql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @param args 查询参数
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	@Override
	public List getSqlList(String sql, int pagesize, int currpage,Object[] args) {
		// TODO Auto-generated method stub
		SQLQuery sq=getSessionFactory().getCurrentSession().createSQLQuery(sql);
		if(args!=null){
			if(args.length>0){
				for(int i=0;i<args.length;i++){
					sq.setParameter(i, args[i]);
				}
			}
		}
		return sq.setFirstResult((currpage-1)*pagesize).setMaxResults(pagesize).list();
	}
	/**
	 * 使用sql语句查询数据集合,用于分页查询
	 * @param sql sql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @param args 查询参数
	 * @param addScalar 用于查询单列数据别名
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	@Override
	public List getSqlList(String sql, int pagesize, int currpage,Object[] args,String addScalar) {
		// TODO Auto-generated method stub
		SQLQuery sq=getSessionFactory().getCurrentSession().createSQLQuery(sql);
		if(addScalar!=null&&addScalar.equals("")==false){
			sq.addScalar("DBID_");
		}
		if(args!=null){
			if(args.length>0){
				for(int i=0;i<args.length;i++){
					sq.setParameter(i, args[i]);
				}
			}
		}
		return sq.setFirstResult((currpage-1)*pagesize).setMaxResults(pagesize).list();
	}

	
	
	/**
	 * 使用sql语句查询数据集合
	 * @param sql sql查询语句
	 * @return 数据集合。map列表
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> getSqlMapList(String sql){
		return getSessionFactory().getCurrentSession().createSQLQuery(sql).setResultTransformer(MapResultTransformer.MY_INSTANCE).list();
	}
	
	
	/**
	 * 使用sql语句查询数据集合
	 * @param sql sql查询语句
	 * @param args 查询参数
	 * @return 数据集合。map列表
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> getSqlMapList(String sql, Object[] args){
		SQLQuery sq=getSessionFactory().getCurrentSession().createSQLQuery(sql);
		if(args!=null){
			if(args.length>0){
				for(int i=0;i<args.length;i++){
					sq.setParameter(i, args[i]);
				}
			}
		}
		return sq.setResultTransformer(MapResultTransformer.MY_INSTANCE).list();
	}
	
	
	/**
	 * 使用sql语句查询数据集合,用于分页查询
	 * @param sql sql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @param args 查询参数
	 * @return 数据集合。Map列表
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> getSqlMapList(String sql, int pagesize, int currpage, Object[] args){
		SQLQuery sq=getSessionFactory().getCurrentSession().createSQLQuery(sql);
		if(args!=null){
			if(args.length>0){
				for(int i=0;i<args.length;i++){
					sq.setParameter(i, args[i]);
				}
			}
		}
		return sq.setResultTransformer(MapResultTransformer.MY_INSTANCE).setFirstResult((currpage-1)*pagesize).setMaxResults(pagesize).list();
	}
	
	
	/**
	 * 使用sql语句获取获得单行数据
	 * @param sql sql语句
	 * @return 单行数据Map
	 */
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getSqlMap(String sql){
		SQLQuery sq = getSessionFactory().getCurrentSession().createSQLQuery(sql);
		try{
			return (Map<String, Object>) sq.setResultTransformer(MapResultTransformer.MY_INSTANCE).uniqueResult();
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 使用sql语句获取获得单行数据
	 * @param sql sql语句
	 * @param args 查询参数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getSqlMap(String sql, Object[] args){
		try{
			SQLQuery sq = getSessionFactory().getCurrentSession().createSQLQuery(sql);
			if(args!=null){
				if(args.length>0){
					for(int i=0;i<args.length;i++){
						sq.setParameter(i, args[i]);
					}
				}
			}
			return (Map<String, Object>) sq.setResultTransformer(MapResultTransformer.MY_INSTANCE).uniqueResult();
		}catch (Exception e) {
			return null;
		}
	}
	
	
	/**
	 * 使用sql语句获取获得单行数据
	 * @param sql sql语句
	 * @return 单行数据Object组数，当只有�?��时，为Object。查不到或查到多条则返加null
	 */
	@Override
	public Object getSqlObject(String sql) {
		try {
			return getSessionFactory().getCurrentSession().createSQLQuery(sql).uniqueResult();
		} catch (Exception e) {
			return null;
		}
	}
	
	/**
	 * 使用sql语句获取获得单行实体数据
	 * @param sql sql语句
	 * @return 单行数据Object组数，当只有�?��时，为Object。查不到或查到多条则返加null
	 */
	@Override
	public Object getSqlEntity(String sql,String className) {
		try {
			return getSessionFactory().getCurrentSession().createSQLQuery(sql).addEntity(Class.forName(className)).uniqueResult();
		} catch (Exception e) {
			return null;
		}
	}
	
	/**
	 * 根据表名获取类名
	 * @param tableName
	 * @return
	 */
	public String getClassName(String tableName){
		  SessionFactory factory =getSessionFactory();
		   Map metaMap = factory.getAllClassMetadata();
		   String className="";
		   Set<String> keys=(Set<String>) metaMap.keySet();
		   for (String key : keys) {
		       AbstractEntityPersister classMetadata = (AbstractEntityPersister) metaMap
		               .get(key);
		       String tableNameTemp = classMetadata.getTableName().toLowerCase();
		       String classNameTemp = classMetadata.getEntityMetamodel().getName();
		     //  System.out.println(tableNameTemp+"[][][][[]][][][][]"+classNameTemp+"[][][][]]"+tableName);
		       if(tableNameTemp.startsWith("qcenter.")){
		    	   tableNameTemp=tableNameTemp.substring(8);
		       }
		       if(tableName.toLowerCase().equals(tableNameTemp)){
		    	   className=classNameTemp;
		    	   break;
		       }
		   }
		   return className;
	}
	
	/**
	 * 使用sql语句获取获得单行数据
	 * @param sql sql语句
	 * @param args 查询参数
	 * @return 单行数据Object组数，当只有�?��时，为Object。查不到或查到多条则返加null
	 */
	@Override
	public Object getSqlObject(String sql,Object[] args) {
		try {
			Query query=getSessionFactory().getCurrentSession().createSQLQuery(sql);
			if(args!=null){
				if(args.length>0){
					for(int i=0;i<args.length;i++){
						query.setParameter(i, args[i]);
					}
				}
			}
			return query.uniqueResult();
		} catch (Exception e) {
			return null;
		}
	}


	/**
	 * 批量添加<br>
	 * @param sql sql插入语句
	 * @param params 参数数组
	 * @return 执行结果数组
	 */
	@Override
	public int[] inserts(String sql, Object[][] params) {
		int[] result=null;
		Connection con=getHibernateTemplate().getSessionFactory().getCurrentSession().connection();
		try {
			PreparedStatement pst=con.prepareStatement(sql);
			con.setAutoCommit(false);  
			for(Object[] param:params){
				
				for(int i=0;i<param.length;i++){
					pst.setObject((i+1), param[i]);
				}
				System.out.println();
				pst.addBatch();
			}
			result=pst.executeBatch();  
			con.commit();  
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 批量添加
	 * @param objects 要添加的实体对象
	 */
	@Override
	public void inserts(Object[] objects) {
		Session session=super.getHibernateTemplate().getSessionFactory().getCurrentSession();
		Transaction tx=null;
		try{
			tx=session.beginTransaction();
			for(int i=0;i<objects.length;i++){
				Object object=objects[i];
				if(insertListener!=null){
					object=insertListener.onInsert(InsertListener.ACTION_BEFORE,object);
				}
				if(object!=null){
					session.saveOrUpdate(object);
					if(insertListener!=null){
						insertListener.onInsert(InsertListener.ACTION_AFTER,object);
					}
				}
				
				//添加20条以后，强制入库 
				//clear()清空缓存
				//postgres数据库的隔离级别是已提交�?Read committed)�?
				//�?��flush以后，数据看不到，只有commit后才能看到数据，
				//如果失败，rollback,前面的flush的数据不会入�?
				if(i%20==0){ 
					session.flush();
					session.clear();
				}
			}
			session.flush();
			session.clear();
			tx.commit();
		}catch(Exception ex){
			ex.printStackTrace();
			tx.rollback();
		}
		
	}


	/**
	 * 用于查询�?��指定的记�?用于分页的记�?br>
	 * @param hql hql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @return �?��询对象集�?
	 */
	@Override
	public List list(final String hql,final int pageSize, final int currentPage) {
		
		//返回list
		return getHibernateTemplate().executeFind(new HibernateCallback(){
			public Object doInHibernate(Session session)throws HibernateException, SQLException {
				Query cri=session.createQuery(hql);
				cri.setFirstResult(pageSize*(currentPage-1));
				cri.setMaxResults(pageSize);
				return cri.list();
			}
		});
	}

	/**
	 * hql分页获得对象列表
	 * @param hql hql查询语句 (from User where name=? and sex=?)
	 * @param pagesize 分页大小
	 * @param currpage 第几�?
	 * @param args 查询参数
	 * @return 对象列表
	 */
	@Override
	public List list(String hql, int pagesize, int currpage, Object[] args) {
		Query query=getSessionFactory().getCurrentSession().createQuery(hql);
		if(args!=null){
			if(args.length>0){
				for(int i=0;i<args.length;i++){
					query.setParameter(i, args[i]);
				}
			}
		}
		query.setFirstResult((currpage-1)*pagesize).setMaxResults(pagesize);
		return query.list();
	}
	
	/**
	 * 用于查询�?��指定的记�?
	 * @param hql hql查询语句
	 * @return �?��询对象集�?
	 */
	@Override
	public List list(final String hql) {
		//返回list
		return getHibernateTemplate().executeFind(new HibernateCallback(){
			public Object doInHibernate(Session session)throws HibernateException, SQLException {
				Query cri=session.createQuery(hql);
				return cri.list();
			}
		});
	}
	
	/**
	 * 用于查询�?��指定的记�?
	 * @param hql hql查询语句
	 * @param args 查询参数
	 * @return �?��询对象集�?
	 */
	@Override
	public List list(final String hql,final Object[] args) {
		//返回list
		return getHibernateTemplate().executeFind(new HibernateCallback(){
			public Object doInHibernate(Session session)throws HibernateException, SQLException {
				Query query=session.createQuery(hql);
				if(args!=null){
					if(args.length>0){
						for(int i=0;i<args.length;i++){
							query.setParameter(i, args[i]);
						}
					}
				}
				return query.list();
			}
		});
	}

	/**
	 * 保存实体对象
	 * @param object 要保存实体对�?
	 * @return 返回保存后的对象ID
	 */
	@Override
	public Serializable save(Object object) {
		return getSessionFactory().getCurrentSession().save(object);
	}

	/**
	 * 保存或�?候修改实体对�?
	 * @param object 要保存或者�?修改实体对象
	 */
	@Override
	public void saveOrUpdate(Object object) {
		getSessionFactory().getCurrentSession().saveOrUpdate(object);
	}

	/** 
	 * 获取SQL字符串语句中的列�?
	 * @param sql 
	 * @return 
	 * @throws SQLException 
	 * @throws HibernateException 
	 */  
	@Override
	public List getSqlColumns(String sql) throws HibernateException, SQLException {
		List list = new ArrayList(); 
		Statement stmt = getSessionFactory().getCurrentSession().connection().createStatement();//createStatement();  
		try {
			ResultSet rs = stmt.executeQuery(sql);
			ResultSetMetaData rsmd = rs.getMetaData();
			for (int i = 0; i < rsmd.getColumnCount(); i++) {
				list.add(rsmd.getColumnLabel(i + 1).toUpperCase());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	    return list;  
	}

	/** 
	 * 获取�?���?
	 * @param hql
	 * @return 
	 */  
	@Override
	public Integer getMaxValue(String hql) {
		return (Integer) getSessionFactory().getCurrentSession().createQuery(hql).uniqueResult();
	}  
	
}
